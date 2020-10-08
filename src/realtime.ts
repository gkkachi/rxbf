import {
  Observable, Subject, concat, of, throwError,
} from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import {
  filter, first, ignoreElements, map, mergeMap, share, tap,
} from 'rxjs/operators';

const WebSocket = require('ws');

type JsonRpcId = string;

type JsonRpcRequest = {
  jsonrpc: '2.0',
  method: string,
  params: any,
  id: JsonRpcId,
}

type JsonRpcResponse = {
  jsonrpc: '2.0',
  result?: boolean,
  error?: {
    code: number,
    message: string,
  },
  id: JsonRpcId,
}

type ProductCode = 'BTC_JPY' | 'FX_BTC_JPY' | 'ETH_BTC';

export default class RealtimeClient {
  protected subject: Subject<JsonRpcRequest | JsonRpcResponse>;

  protected subscribed: { [key: string]: Observable<unknown> } = {};

  protected auth$: Observable<unknown> = of();

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

  protected subscribe(channel: string) {
    if (!this.subscribed[channel]) {
      this.subscribed[channel] = concat(
        this.auth$.pipe(ignoreElements()),
        this.call('subscribe', { channel }).pipe(ignoreElements()),
        this.channelMessage(channel),
      );
    }
    return this.subscribed[channel];
  }

  protected channelMessage(channel: string) {
    return this.subject.asObservable().pipe(
      map((x) => x as JsonRpcRequest),
      filter(
        (x) => x.method === 'channelMessage' && x.params?.channel === channel,
      ),
      map((x) => x.params?.message),
      share(),
    );
  }

  protected call(method: string, params: object) {
    return of(Date.now().toString()).pipe(
      tap(
        (id) => this.subject.next({
          jsonrpc: '2.0',
          method,
          params,
          id,
        }),
      ),
      mergeMap((id) => this.subject.asObservable().pipe(filter((res) => res.id === id))),
      map((x) => x as JsonRpcResponse),
      mergeMap((res) => (res.error ? throwError(res.error.message) : of(res))),
      first(),
    );
  }
}
