import './rxbf';
import { env } from 'process';
import { pipe } from 'rxjs';
import { first, timeout } from 'rxjs/operators';
import HttpClientAuth from './http-auth';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

describe('HttpClientAuth', () => {
  const client = new HttpClientAuth(env.BITFLYER_API_KEY, env.BITFLYER_API_SECRET);
  const code: 'FX_BTC_JPY' = 'FX_BTC_JPY';
  const f = pipe(first(), timeout(10 * 1000));

  it('should get permissions', async () => {
    const res = await client.permissions().pipe(f).toPromise();
    expect(res).toBeInstanceOf(Array);
  });

  it('should get trading commission', async () => {
    const res = await client.tradingCommission(code).pipe(f).toPromise();
    expect(res).toEqual({
      commission_rate: expect.any(Number),
    });
  });
});
