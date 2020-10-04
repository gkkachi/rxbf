import { URL } from 'url';
import { Subject, of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { webSocket } from 'rxjs/webSocket';
import { filter, map, mergeMap } from 'rxjs/operators';

const WebSocket = require('ws');
global.fetch = require('node-fetch');

type ProductCode = 'BTC_JPY' | 'FX_BTC_JPY' | 'ETH_BTC';

export default class RXBF {
    private subject: Subject<any>;

    private subscribed: string[] = [];

    constructor() {
      this.subject = webSocket({
        url: 'wss://ws.lightstream.bitflyer.com/json-rpc',
        WebSocketCtor: WebSocket,
      });
      this.subject.subscribe();
    }

    public unsubscribe() {
      this.subject.unsubscribe();
    }

    public board(product: ProductCode) {
      return this.subscribe(`lightning_board_${product}`);
    }

    public boardSnapshot(product: ProductCode) {
      return this.subscribe(`lightning_board_snapshot_${product}`);
    }

    public executions(product: ProductCode) {
      return this.subscribe(`lightning_executions_${product}`);
    }

    public ticker(product: ProductCode) {
      return this.subscribe(`lightning_ticker_${product}`);
    }

    public static markets() {
      return RXBF.get('markets', {});
    }

    public static board1(product?: ProductCode) {
      return RXBF.get('board', { product_code: product });
    }

    public static ticker1(product?: ProductCode) {
      return RXBF.get('ticker', { product_code: product });
    }

    public static executions1(product?: ProductCode) {
      return RXBF.get('executions', { product_code: product });
    }

    public static boardState(product?: ProductCode) {
      return RXBF.get('getboardstate', { product_code: product });
    }

    public static health(product?: ProductCode) {
      return RXBF.get('gethealth', { product_code: product });
    }

    public static chats(from?: Date) {
      return RXBF.get('getchats', { from_date: from?.toISOString() });
    }

    private subscribe(channel: string) {
      if (this.subscribed.indexOf(channel) < 0) {
        this.call('subscribe', { channel });
        this.subscribed.push(channel);
      }
      return this.subject.asObservable().pipe(
        filter(
          (x) => x.method === 'channelMessage' && x.params?.channel === channel,
        ),
        map((x) => x.params?.message),
      );
    }

    private call(method: string, params: object) {
      this.subject.next({
        jsonrpc: '2.0',
        method,
        params,
        id: Date.now().toString(),
      });
    }

    private static get(method: string, params: object) {
      const url = new URL(`https://api.bitflyer.com/v1/${method}`);
      // eslint-disable-next-line no-return-assign
      Object.entries(params).forEach(([k, v]) => url.search = `${k}=${v}`);
      return fromFetch(url.toString()).pipe(
        mergeMap((x) => (x.ok ? of(x.json()) : throwError(new Error(x.status.toString())))),
      );
    }
}
