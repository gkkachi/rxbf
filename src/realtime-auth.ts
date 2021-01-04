import { createHmac, randomBytes } from 'crypto';
import { Observable, from } from 'rxjs';
import {
  switchMap, mergeAll, shareReplay,
} from 'rxjs/operators';
import RealtimeClient from './realtime';
import type * as Types from './types';

export default class RealtimeAuthClient extends RealtimeClient {
  private auth$: Observable<unknown>;

  constructor(key?: string, secret?: string) {
    if (!key || !secret) {
      throw new Error('API key and/or secret are required.');
    }
    super();
    this.auth$ = from(this.auth(key, secret)).pipe(shareReplay());
  }

  public childOrderEvents() {
    return this.subscribeAuth<Types.ChildOrderEvent[]>('child_order_events').pipe(mergeAll());
  }

  public parentOrderEvents() {
    return this.subscribeAuth<Types.ParentOrderEvent[]>('parent_order_events').pipe(mergeAll());
  }

  protected subscribeAuth<T>(channel: string) {
    return this.auth$.pipe(switchMap(() => this.subscribe<T>(channel)));
  }

  protected auth(key: string, secret: string) {
    const timestamp = Date.now();
    const nonce = randomBytes(16).toString('hex');
    const signature = createHmac('sha256', secret)
      .update(timestamp + nonce).digest('hex');
    return this.call('auth', {
      api_key: key, timestamp, nonce, signature,
    });
  }
}
