import { createHmac, randomBytes } from 'crypto';
import io from 'socket.io-client';
import { Observable, ReplaySubject } from 'rxjs';
import { distinct, mergeAll } from 'rxjs/operators';
import type * as Types from './types';

type ProductCode = 'BTC_JPY' | 'FX_BTC_JPY' | 'ETH_BTC';

export default class RealtimeClient {
  protected socket: ReturnType<typeof io>;

  protected channel$ = new ReplaySubject<string>();

  constructor() {
    this.socket = io('https://io.lightstream.bitflyer.com', { transports: ['websocket'] });
    this.socket.on('connect', () => {
      this.channel$.pipe(distinct()).subscribe((channel) => this.socket.emit('subscribe', channel));
    });
  }

  public unsubscribe() {
    this.socket.disconnect();
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
    return new Observable<T>((subscriber) => {
      const listener = (message: T) => subscriber.next(message);
      this.socket.on(channel, listener);
      return () => this.socket.off(channel, listener);
    });
  }

  protected auth(key: string, secret: string) {
    const timestamp = Date.now();
    const nonce = randomBytes(16).toString('hex');
    const signature = createHmac('sha256', secret)
      .update(timestamp + nonce).digest('hex');
    return new Promise<void>((resolve, reject) => {
      this.socket.emit('auth', {
        api_key: key, timestamp, nonce, signature,
      }, (err: any) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}
