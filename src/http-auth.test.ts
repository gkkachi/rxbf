import './rxbf';
import { env } from 'process';
import HttpAuthClient from './http-auth';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

describe('HttpAuthClient', () => {
  const client = new HttpAuthClient(env.BITFLYER_API_KEY, env.BITFLYER_API_SECRET);
  const code: 'FX_BTC_JPY' = 'FX_BTC_JPY';

  it('should get permissions', async () => {
    const res = await client.permissions();
    expect(res).toBeInstanceOf(Array);
  });

  it('should get addresses', async () => {
    const res = await client.addresses();
    expect(res).toBeInstanceOf(Array);
  });

  it('should get trading commission', async () => {
    const res = await client.tradingCommission(code);
    expect(res).toEqual({
      commission_rate: expect.any(Number),
    });
  });
});
