import './rxbf';
import HttpClient from './http';

describe('HttpClient', () => {
  const code: 'FX_BTC_JPY' = 'FX_BTC_JPY';

  it('should get markets', async () => {
    const res = await HttpClient.markets();
    expect(res).toBeInstanceOf(Array);
    res?.forEach((x: any) => {
      // eslint-disable-next-line no-param-reassign
      delete x.alias;
      expect(x).toEqual({
        product_code: expect.any(String),
        market_type: expect.any(String),
      });
    });
  });

  it('should get board', async () => {
    const res = await HttpClient.board1(code);
    expect(res).toEqual({
      mid_price: expect.any(Number),
      bids: expect.any(Array),
      asks: expect.any(Array),
    });
  });

  it('should get ticker', async () => {
    const res = await HttpClient.ticker1(code);
    expect(res).toEqual({
      product_code: code,
      state: expect.any(String),
      timestamp: expect.any(String),
      tick_id: expect.any(Number),
      best_bid: expect.any(Number),
      best_ask: expect.any(Number),
      best_bid_size: expect.any(Number),
      best_ask_size: expect.any(Number),
      total_bid_depth: expect.any(Number),
      total_ask_depth: expect.any(Number),
      market_bid_size: expect.any(Number),
      market_ask_size: expect.any(Number),
      ltp: expect.any(Number),
      volume: expect.any(Number),
      volume_by_product: expect.any(Number),
    });
  });

  it('should get executions', async () => {
    const res = await HttpClient.executions1(code);
    expect(res).toBeInstanceOf(Array);
    res?.forEach((x) => {
      expect(x).toEqual({
        id: expect.any(Number),
        side: expect.any(String),
        price: expect.any(Number),
        size: expect.any(Number),
        exec_date: expect.any(String),
        buy_child_order_acceptance_id: expect.any(String),
        sell_child_order_acceptance_id: expect.any(String),
      });
    });
  });

  it('should get board state', async () => {
    const res: any = await HttpClient.boardState(code);
    // eslint-disable-next-line no-param-reassign
    delete res.data;
    expect(res).toEqual({
      health: expect.any(String),
      state: expect.any(String),
    });
  });

  it('should get health', async () => {
    const res = await HttpClient.health(code);
    expect(res).toEqual({
      status: expect.any(String),
    });
  });

  it('should get chats', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const res = await HttpClient.chats(yesterday);
    expect(res).toBeInstanceOf(Array);
    res?.forEach((x) => {
      expect(x).toEqual({
        nickname: expect.any(String),
        message: expect.any(String),
        date: expect.any(String),
      });
    });
  });
});
