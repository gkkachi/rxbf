import {
  Observable, Subject, concat, from,
} from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import {
  filter, first, ignoreElements, map, share,
} from 'rxjs/operators';

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

  constructor() {
    this.subject = webSocket({
      url: 'wss://ws.lightstream.bitflyer.com/json-rpc',
      // eslint-disable-next-line global-require
      WebSocketCtor: require('ws'),
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
        from(this.call('subscribe', { channel })).pipe(ignoreElements()),
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

  protected async call(method: string, params: object) {
    const id = Date.now().toString();
    this.subject.next({
      jsonrpc: '2.0',
      method,
      params,
      id,
    });
    const response: JsonRpcResponse = await this.subject.pipe(
      filter((res) => res.id === id),
      first(),
    ).toPromise();
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response;
  }
}
