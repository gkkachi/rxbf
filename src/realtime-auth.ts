import { createHmac, randomBytes } from 'crypto';
import { shareReplay } from 'rxjs/operators';
import RealtimeClient from './realtime';

export default class RealtimeAuthClient extends RealtimeClient {
  constructor(key: string, secret: string) {
    if (!key || !secret) {
      throw new Error('API key and/or secret are required.');
    }
    super();
    this.auth$ = this.auth(key, secret).pipe(shareReplay());
  }

  public childOrderEvents() {
    return this.subscribe('child_order_events');
  }

  public parentOrderEvents() {
    return this.subscribe('parent_order_events');
  }

  protected subscribe(channel: string) {
    return super.subscribe(channel);
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
