import { pipe } from 'rxjs';
import { first, timeout } from 'rxjs/operators';
import RXBF from './rxbf';

describe('RXBF', () => {
  const rxbf = new RXBF();
  const code: 'FX_BTC_JPY' = 'FX_BTC_JPY';
  const f = pipe(first(), timeout(10 * 1000));

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

  it('should get markets', async () => {
    const res: any = await RXBF.markets().pipe(f).toPromise();
    expect(res).toBeInstanceOf(Array);
    res.forEach((x) => {
      // eslint-disable-next-line no-param-reassign
      delete x.alias;
      expect(x).toEqual({
        product_code: expect.any(String),
        market_type: expect.any(String),
      });
    });
  });

  it('should get board', async () => {
    const res: any = await RXBF.board1(code).pipe(f).toPromise();
    expect(res).toEqual({
      mid_price: expect.any(Number),
      bids: expect.any(Array),
      asks: expect.any(Array),
    });
  });

  it('should get ticker', async () => {
    const res: any = await RXBF.ticker1(code).pipe(f).toPromise();
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
    const res: any = await RXBF.executions1(code).pipe(f).toPromise();
    expect(res).toBeInstanceOf(Array);
    res.forEach((x) => {
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
    const res: any = await RXBF.boardState(code).pipe(f).toPromise();
    // eslint-disable-next-line no-param-reassign
    delete res.data;
    expect(res).toEqual({
      health: expect.any(String),
      state: expect.any(String),
    });
  });

  it('should get health', async () => {
    const res: any = await RXBF.health(code).pipe(f).toPromise();
    expect(res).toEqual({
      status: expect.any(String),
    });
  });

  it('should get chats', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const res: any = await RXBF.chats(yesterday).pipe(f).toPromise();
    expect(res).toBeInstanceOf(Array);
    res.forEach((x) => {
      expect(x).toEqual({
        nickname: expect.any(String),
        message: expect.any(String),
        date: expect.any(String),
      });
    });
  });
});
