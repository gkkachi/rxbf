import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { filter, map } from 'rxjs/operators';

const WebSocket = require('ws');

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
}
