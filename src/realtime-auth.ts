import { createHmac, randomBytes } from 'crypto';
import { Observable, from, concat } from 'rxjs';
import { ignoreElements, shareReplay } from 'rxjs/operators';
import RealtimeClient from './realtime';

export default class RealtimeAuthClient extends RealtimeClient {
  private auth$: Observable<unknown>;

  constructor(key?: string, secret?: string) {
    if (!key || !secret) {
      throw new Error('API key and/or secret are required.');
    }
    super();
    this.auth$ = from(this.auth(key, secret)).pipe(shareReplay(), ignoreElements());
  }

  public childOrderEvents() {
    return this.subscribe('child_order_events');
  }

  public parentOrderEvents() {
    return this.subscribe('parent_order_events');
  }

  protected subscribe(channel: string) {
    return concat(this.auth$, super.subscribe(channel));
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
