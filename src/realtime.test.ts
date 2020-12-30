import { env } from 'process';
import { pipe } from 'rxjs';
import { first, timeout } from 'rxjs/operators';
// import RealtimeClient from './realtime';
import RealtimeClient from './realtime-auth';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

describe('RealtimeClient', () => {
  const rxbf = new RealtimeClient(env.BITFLYER_API_KEY, env.BITFLYER_API_SECRET);
  const code: 'FX_BTC_JPY' = 'FX_BTC_JPY';
  const f = pipe(first(), timeout(60 * 1000));

  afterAll(() => { rxbf.unsubscribe(); });

  it('should subscribe board', async () => {
    const res = await rxbf.board(code).pipe(f).toPromise();
    expect(res).toBeTruthy();
  });

  it('should subscribe boardSnapshot', async () => {
    const res = await rxbf.boardSnapshot(code).pipe(f).toPromise();
    expect(res).toBeTruthy();
  });

  it('should subscribe executions', async () => {
    const res = await rxbf.executions(code).pipe(f).toPromise();
    expect(res).toBeTruthy();
  });

  it('should subscribe ticker', async () => {
    const res = await rxbf.ticker(code).pipe(f).toPromise();
    expect(res).toBeTruthy();
  });
});
