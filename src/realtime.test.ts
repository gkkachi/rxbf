import { env } from 'process';
import { merge } from 'rxjs';
import {
  first, map, take, toArray,
} from 'rxjs/operators';
// import RealtimeClient from './realtime';
import RealtimeClient from './realtime-auth';

jest.setTimeout(60 * 1000);

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

describe('RealtimeClient', () => {
  const rxbf = new RealtimeClient(env.BITFLYER_API_KEY, env.BITFLYER_API_SECRET);
  const code: 'FX_BTC_JPY' = 'FX_BTC_JPY';

  afterAll(() => { rxbf.unsubscribe(); });

  it('should subscribe board', async () => {
    const res = await rxbf.board(code).pipe(first()).toPromise();
    expect(res).toBeTruthy();
  });

  it('should subscribe boardSnapshot', async () => {
    const res = await rxbf.boardSnapshot(code).pipe(first()).toPromise();
    expect(res).toBeTruthy();
  });

  it('should subscribe executions', async () => {
    const res = await rxbf.executions(code).pipe(first()).toPromise();
    expect(res).toBeTruthy();
  });

  it('should subscribe ticker', async () => {
    const res = await merge(rxbf.ticker('BTC_JPY'), rxbf.ticker('FX_BTC_JPY')).pipe(
      map((x) => x.product_code),
      take(20),
      toArray(),
    ).toPromise();
    expect(res.find((x) => x === 'BTC_JPY')).toBeTruthy();
    expect(res.find((x) => x === 'FX_BTC_JPY')).toBeTruthy();
  });
});
