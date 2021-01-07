import { createHmac, randomBytes } from 'crypto';
import { Client } from 'jsonrpc2-ws';
import { Observable, Subject } from 'rxjs';
import {
  concatMap, distinct, filter, map, mergeAll, share,
} from 'rxjs/operators';
import type * as Types from './types';

type ProductCode = 'BTC_JPY' | 'FX_BTC_JPY' | 'ETH_BTC';

export default class RealtimeClient {
  protected client: Client;

  protected message$: Observable<{ channel: string, message: unknown }>;

  protected channel$ = new Subject<string>();

  constructor() {
    this.client = new Client('wss://ws.lightstream.bitflyer.com/json-rpc');
    this.message$ = new Observable((subscriber) => {
      this.client.methods.set('channelMessage', (_, params) => {
        subscriber.next(params);
      });
    }).pipe(share<any>());
    this.channel$.pipe(
      distinct(),
      concatMap((channel) => this.client.call('subscribe', { channel })),
    ).subscribe();
  }

  public unsubscribe() {
    this.client.disconnect();
  }

  public board(product: ProductCode) {
    return this.subscribe<Types.Board>(`lightning_board_${product}`);
  }

  public boardSnapshot(product: ProductCode) {
    return this.subscribe<Types.Board>(`lightning_board_snapshot_${product}`);
  }

  public executions(product: ProductCode) {
    return this.subscribe<Types.Execution[]>(`lightning_executions_${product}`).pipe(mergeAll());
  }

  public ticker(product: ProductCode) {
    return this.subscribe<Types.Ticker>(`lightning_ticker_${product}`);
  }

  protected subscribe<T>(channel: string) {
    this.channel$.next(channel);
    return this.message$.pipe(
      filter((params) => params.channel === channel),
      map(({ message }) => message as T),
    );
  }

  protected auth(key: string, secret: string) {
    const timestamp = Date.now();
    const nonce = randomBytes(16).toString('hex');
    const signature = createHmac('sha256', secret)
      .update(timestamp + nonce).digest('hex');
    return this.client.call('auth', {
      api_key: key, timestamp, nonce, signature,
    });
  }
}
