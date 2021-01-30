/* eslint-disable camelcase */

export const markets = [
  { product_code: 'BTC_JPY' as const, market_type: 'Spot' as const },
  { product_code: 'ETH_JPY' as const, market_type: 'Spot' as const },
  { product_code: 'FX_BTC_JPY' as const, market_type: 'FX' as const },
  { product_code: 'ETH_BTC' as const, market_type: 'Spot' as const },
  { product_code: 'BCH_BTC' as const, market_type: 'Spot' as const },
];

export type Market = typeof markets[0];
export type ProductCode = Market['product_code'];

export const board = {
  mid_price: 33320,
  bids: [
    {
      price: 30000,
      size: 0.1,
    },
    {
      price: 25570,
      size: 3,
    },
  ],
  asks: [
    {
      price: 36640,
      size: 5,
    },
    {
      price: 36700,
      size: 1.2,
    },
  ],
};

export type Board = typeof board;

export type BoardState = 'RUNNING' | 'CLOSED' | 'STARTING' | 'PREOPEN' | 'CIRCUIT BREAK' | 'AWAITING SQ' | 'MATURED';

export const ticker = {
  product_code: 'BTC_JPY' as ProductCode,
  state: 'RUNNING' as BoardState,
  timestamp: '2015-07-08T02:50:59.97',
  tick_id: 3579,
  best_bid: 30000,
  best_ask: 36640,
  best_bid_size: 0.1,
  best_ask_size: 5,
  total_bid_depth: 15.13,
  total_ask_depth: 20,
  market_bid_size: 0,
  market_ask_size: 0,
  ltp: 31690,
  volume: 16819.26,
  volume_by_product: 6819.26,
};

export type Ticker = typeof ticker;

export const executions = [
  {
    id: 39287,
    side: 'BUY' as const,
    price: 31690,
    size: 27.04,
    exec_date: '2015-07-08T02:43:34.823',
    buy_child_order_acceptance_id: 'JRF20150707-200203-452209',
    sell_child_order_acceptance_id: 'JRF20150708-024334-060234',
  },
  {
    id: 39286,
    side: 'SELL' as const,
    price: 33170,
    size: 0.36,
    exec_date: '2015-07-08T02:43:34.72',
    buy_child_order_acceptance_id: 'JRF20150708-010230-400876',
    sell_child_order_acceptance_id: 'JRF20150708-024334-197755',
  },
];

export type Execution = typeof executions[0];

export type Side = Execution['side'];

export type Health = 'NOMAL' |'BUSY' | 'VERY BUSY' | 'SUPER BUSY' | 'NO ORDER' | 'STOP';

export const boardState = {
  health: 'NORMAL' as Health,
  state: 'RUNNING' as BoardState,
};

export const health = {
  status: 'NORMAL' as Health,
};

export const chats = [
  {
    nickname: 'User1234567',
    message: 'Hello world!',
    date: '2016-02-16T10:58:08.833',
  },
  {
    nickname: 'ビット太郎',
    message: 'サンプルメッセージ',
    date: '2016-02-15T10:18:06.67',
  },
];

export type Chat = typeof chats[0];

export type CurrencyCode = 'JPY' | 'USD' | 'BTC' | 'BCH' | 'ETH' | 'ETC' | 'LTC' | 'MONA' | 'LSK' | 'XRP' | 'BAT' | 'XLM' | 'XEM';

export const balance = [
  {
    currency_code: 'JPY' as CurrencyCode,
    amount: 1024078,
    available: 508000,
  },
  {
    currency_code: 'BTC' as CurrencyCode,
    amount: 10.24,
    available: 4.12,
  },
  {
    currency_code: 'ETH' as CurrencyCode,
    amount: 20.48,
    available: 16.38,
  },
];

export type BalanceItem = typeof balance[0];

export const collateral = {
  collateral: 100000,
  open_position_pnl: -715,
  require_collateral: 19857,
  keep_rate: 5.000,
};

export type Collateral = typeof collateral;

export const collateralAccounts = [
  {
    currency_code: 'JPY' as const,
    amount: 10000,
  },
  {
    currency_code: 'BTC' as const,
    amount: 1.23,
  },
];

export type CollateralAccount = typeof collateralAccounts[0];

export type Address = {
  type: 'NORMAL',
  currency_code: CurrencyCode,
  address: string,
};

export const addresses: Address[] = [
  {
    type: 'NORMAL',
    currency_code: 'BTC',
    address: '3AYrDq8zhF82NJ2ZaLwBMPmaNziaKPaxa7',
  },
  {
    type: 'NORMAL',
    currency_code: 'ETH',
    address: '0x7fbB2CC24a3C0cd3789a44e9073381Ca6470853f',
  },
];

export type CoinStatus = 'PENDING' | 'COMPLETED';

export const coinIns = [
  {
    id: 100,
    order_id: 'CDP20151227-024141-055555',
    currency_code: 'BTC' as CurrencyCode,
    amount: 0.00002,
    address: '1WriteySQufKZ2pVuM1oMhPrTtTVFq35j',
    tx_hash: '9f92ee65a176bb9545f7becb8706c50d07d4cee5ffca34d8be3ef11d411405ae',
    status: 'COMPLETED' as CoinStatus,
    event_date: '2015-11-27T08:59:20.301',
  },
];

export type CoinIn = typeof coinIns[0];

export const coinOuts = [
  {
    id: 500,
    order_id: 'CWD20151224-014040-077777',
    currency_code: 'BTC' as CurrencyCode,
    amount: 0.1234,
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    tx_hash: '724c07dfd4044abcb390b0412c3e707dd5c4f373f0a52b3bd295ce32b478c60a',
    fee: 0.0005,
    additional_fee: 0.0001,
    status: 'COMPLETED' as CoinStatus,
    event_date: '2015-12-24T01:40:40.397',
  },
];

export type CoinOut = typeof coinOuts[0];

export const banckAccounts = [
  {
    id: 3402,
    is_verified: true,
    bank_name: '三井住友銀行',
    branch_name: 'アオイ支店',
    account_type: '普通',
    account_number: '1111111',
    account_name: 'ビットフライヤータロウ',
  },
];

export type BankAccount = typeof banckAccounts[0];

export const deposits = [
  {
    id: 300,
    order_id: 'MDP20151014-101010-033333',
    currency_code: 'JPY' as const,
    amount: 10000,
    status: 'COMPLETED' as CoinStatus,
    event_date: '2015-10-14T10:10:10.001',
  },
];

export type Deposit = typeof deposits[0];

export const withdraw = {
  currency_code: 'JPY' as const,
  bank_account_id: 1234,
  amount: 12000,
  code: '012345',
};

export type Withdraw = typeof withdraw;

export const withdrawals = [
  {
    id: 700,
    order_id: 'MWD20151020-090909-011111',
    currency_code: 'JPY' as const,
    amount: 12000,
    status: 'COMPLETED' as CoinStatus,
    event_date: '2015-10-20T09:09:09.416',
  },
];

export type Withdrawal = typeof withdrawals[0]

export type OrderType = 'LIMIT' | 'MARKET';
export type TimeInForce = 'GTC' | 'IOC' | 'FOK';

export type ChildOrderBodyItem = {
  product_code: ProductCode,
  child_order_type: OrderType,
  side: Side,
  size: number,
  price: number,
  minute_to_expire: number,
  time_in_force: TimeInForce,
}

export type ChildOrderBody = (ChildOrderBodyItem & { child_order_type: 'LIMIT' })
  | (Omit<ChildOrderBodyItem & { child_order_type: 'MARKET' }, 'price'>)

export const childOrderBody: ChildOrderBody = {
  product_code: 'BTC_JPY' as ProductCode,
  child_order_type: 'LIMIT' as OrderType,
  side: 'BUY' as Side,
  price: 30000,
  size: 0.1,
  minute_to_expire: 10000,
  time_in_force: 'GTC' as TimeInForce,
};

export const cancelChildOrder1 = {
  product_code: 'BTC_JPY' as ProductCode,
  child_order_id: 'JOR20150707-055555-022222',
};

export const cancelChildOrder2 = {
  product_code: 'BTC_JPY' as ProductCode,
  child_order_acceptance_id: 'JRF20150707-033333-099999',
};

export type CancelChildOrder = typeof cancelChildOrder1 | typeof cancelChildOrder2;

type ConditionType = OrderType | 'STOP' | 'STOP_LIMIT' | 'TRAIL';
type OrderMethod = 'SIMPLE' | 'IFD' | 'OCO' | 'IFDOCO';

type ParentOrderParameterItem = {
  product_code: ProductCode,
  condition_type: ConditionType,
  side: Side,
  size: number,
  price: number,
  trigger_price: number,
  offset: number,
};

type ParentOrderParameter= Omit<ParentOrderParameterItem & { condition_type: 'LIMIT'}, 'trigger_price' | 'offset'>
 | Omit<ParentOrderParameterItem & { condition_type: 'MARKET'}, 'price' | 'trigger_price' | 'offset'>
 | Omit<ParentOrderParameterItem & { condition_type: 'STOP'}, 'price' | 'offset'>
 | Omit<ParentOrderParameterItem & { condition_type: 'STOP_LIMIT'}, 'offset'>
 | Omit<ParentOrderParameterItem & { condition_type: 'TRAIL'}, 'price' | 'trigger_price'>;

type ParentOrderItem = {
  order_method: OrderMethod,
  minute_to_expire: number,
  time_in_force: TimeInForce,
  parameters: ParentOrderParameter[],
};

export type ParentOrderBody = ParentOrderItem & {order_method: 'SIMPLE', parameters: [ParentOrderParameter]}
 | ParentOrderItem & {order_method: 'IFD' | 'OCO', parameters: [ParentOrderParameter, ParentOrderParameter]}
 | ParentOrderItem & {order_method: 'IFDOCO', parameters: [ParentOrderParameter, ParentOrderParameter, ParentOrderParameter]};

export const parentOrderBody: ParentOrderBody = {
  order_method: 'IFDOCO',
  minute_to_expire: 10000,
  time_in_force: 'GTC',
  parameters: [{
    product_code: 'BTC_JPY',
    condition_type: 'LIMIT',
    side: 'BUY',
    price: 30000,
    size: 0.1,
  },
  {
    product_code: 'BTC_JPY',
    condition_type: 'LIMIT',
    side: 'SELL',
    price: 32000,
    size: 0.1,
  },
  {
    product_code: 'BTC_JPY',
    condition_type: 'STOP_LIMIT',
    side: 'SELL',
    price: 28800,
    trigger_price: 29000,
    size: 0.1,
  }],
};

export const cancelParentOrder1 = {
  product_code: 'BTC_JPY' as ProductCode,
  parent_order_id: 'JCO20150925-055555-022222',
};

export const cancelParentOrder2 = {
  product_code: 'BTC_JPY' as ProductCode,
  parent_order_acceptance_id: 'JRF20150925-033333-099999',
};

export type CancelParentOrder = typeof cancelParentOrder1 | typeof cancelParentOrder2;

export const cancelAllChildOrders = {
  product_code: 'BTC_JPY' as ProductCode,
};

export type CancelAllChildOrders = typeof cancelAllChildOrders;

export type OrderState = 'ACTIVE' | 'COMPLETED' | 'CANCELED' | 'EXPIRED' | 'REJECTED';

export const childOrders = [
  {
    id: 138398,
    child_order_id: 'JOR20150707-084555-022523',
    product_code: 'BTC_JPY' as ProductCode,
    side: 'BUY' as Side,
    child_order_type: 'LIMIT' as OrderType,
    price: 30000,
    average_price: 30000,
    size: 0.1,
    child_order_state: 'COMPLETED' as OrderState,
    expire_date: '2015-07-14T07:25:52',
    child_order_date: '2015-07-07T08:45:53',
    child_order_acceptance_id: 'JRF20150707-084552-031927',
    outstanding_size: 0,
    cancel_size: 0,
    executed_size: 0.1,
    total_commission: 0,
  },
  {
    id: 138397,
    child_order_id: 'JOR20150707-084549-022519',
    product_code: 'BTC_JPY' as ProductCode,
    side: 'SELL' as Side,
    child_order_type: 'LIMIT' as OrderType,
    price: 30000,
    average_price: 0,
    size: 0.1,
    child_order_state: 'CANCELED' as OrderState,
    expire_date: '2015-07-14T07:25:47',
    child_order_date: '2015-07-07T08:45:47',
    child_order_acceptance_id: 'JRF20150707-084547-396699',
    outstanding_size: 0,
    cancel_size: 0.1,
    executed_size: 0,
    total_commission: 0,
  },
];

export type ChildOrder = typeof childOrders[0];

export const parentOrders = [
  {
    id: 138398,
    parent_order_id: 'JCO20150707-084555-022523',
    product_code: 'BTC_JPY' as ProductCode,
    side: 'BUY' as Side,
    parent_order_type: 'STOP' as ConditionType,
    price: 30000,
    average_price: 30000,
    size: 0.1,
    parent_order_state: 'COMPLETED' as OrderState,
    expire_date: '2015-07-14T07:25:52',
    parent_order_date: '2015-07-07T08:45:53',
    parent_order_acceptance_id: 'JRF20150707-084552-031927',
    outstanding_size: 0,
    cancel_size: 0,
    executed_size: 0.1,
    total_commission: 0,
  },
  {
    id: 138397,
    parent_order_id: 'JCO20150707-084549-022519',
    product_code: 'BTC_JPY' as ProductCode,
    side: 'SELL' as Side,
    parent_order_type: 'IFD' as OrderMethod,
    price: 30000,
    average_price: 0,
    size: 0.1,
    parent_order_state: 'CANCELED',
    expire_date: '2015-07-14T07:25:47',
    parent_order_date: '2015-07-07T08:45:47',
    parent_order_acceptance_id: 'JRF20150707-084547-396699',
    outstanding_size: 0,
    cancel_size: 0.1,
    executed_size: 0,
    total_commission: 0,
  },
];

export type ParentOrder = typeof parentOrders[0];

export type ParentOrderDetail = {
  id: number,
  parent_order_id: string,
  parent_order_acceptance_id: string,
  order_method: OrderMethod,
  expire_date: string,
  time_in_force: TimeInForce,
  parameters: ParentOrderParameterItem[],
};

export const parentOrder: ParentOrderDetail = {
  id: 4242,
  parent_order_id: 'JCP20150825-046876-036161',
  order_method: 'IFDOCO',
  expire_date: '2015-09-24T04:35:59.277',
  time_in_force: 'GTC',
  parameters: [{
    product_code: 'BTC_JPY',
    condition_type: 'LIMIT',
    side: 'BUY',
    price: 30000,
    size: 0.1,
    trigger_price: 0,
    offset: 0,
  }, {
    product_code: 'BTC_JPY',
    condition_type: 'LIMIT',
    side: 'SELL',
    price: 32000,
    size: 0.1,
    trigger_price: 0,
    offset: 0,
  }, {
    product_code: 'BTC_JPY',
    condition_type: 'STOP_LIMIT',
    side: 'SELL',
    price: 28800,
    size: 0.1,
    trigger_price: 29000,
    offset: 0,
  }],
  parent_order_acceptance_id: 'JRF20150925-060559-396699',
};

export const myExecutions = [
  {
    id: 37233,
    child_order_id: 'JOR20150707-060559-021935',
    side: 'BUY' as Side,
    price: 33470,
    size: 0.01,
    commission: 0,
    exec_date: '2015-07-07T09:57:40.397',
    child_order_acceptance_id: 'JRF20150707-060559-396699',
  },
  {
    id: 37232,
    child_order_id: 'JOR20150707-060426-021925',
    side: 'BUY' as Side,
    price: 33470,
    size: 0.01,
    commission: 0,
    exec_date: '2015-07-07T09:57:40.397',
    child_order_acceptance_id: 'JRF20150707-060559-396699',
  },
];

export type MyExecution = typeof myExecutions[0];

export type TradeType = 'BUY' | 'SELL' | 'DEPOSIT' | 'WITHDRAW' | 'FEE' | 'POST_COLL' | 'CANCEL_COLL' | 'PAYMENT' | 'TRANSFER';

export const balanceHistory = [
  {
    id: 1000108,
    trade_date: '2016-10-19T14:44:55.28',
    event_date: '2016-10-19T05:44:55.28',
    product_code: 'BTC_USD' as ProductCode,
    currency_code: 'USD' as CurrencyCode,
    trade_type: 'SELL' as TradeType,
    price: 9999.99,
    amount: 99.99,
    quantity: 99.99,
    commission: 0,
    balance: 9999999.99,
    order_id: 'JORYYYYMMDD‌-000000-000001X',
  },
  {
    id: 1000107,
    trade_date: '2016-10-19T14:41:35.23',
    event_date: '2016-10-19T05:41:35.23',
    product_code: 'BTC_USD' as ProductCode,
    currency_code: 'USD' as CurrencyCode,
    trade_type: 'SELL' as TradeType,
    price: 9999.99,
    amount: 999.99,
    quantity: 99.99,
    commission: 0,
    balance: 9999999.99,
    order_id: 'JORYYYYMMDD‌-000000-000000X',
  },
];

export type BalanceHistoryItem = typeof balanceHistory[0];

export const positions = [
  {
    product_code: 'FX_BTC_JPY' as ProductCode,
    side: 'BUY' as Side,
    price: 36000,
    size: 10,
    commission: 0,
    swap_point_accumulate: -35,
    require_collateral: 120000,
    open_date: '2015-11-03T10:04:45.011',
    leverage: 3,
    pnl: 965,
    sfd: -0.5,
  },
];

export type Position = typeof positions[0];

export const collateralHistory = [
  {
    id: 4995,
    currency_code: 'JPY' as CurrencyCode,
    change: -6,
    amount: -6,
    reason_code: 'CLEARING_COLL',
    date: '2017-05-18T02:37:41.327',
  },
  {
    id: 4994,
    currency_code: 'JPY' as CurrencyCode,
    change: 2083698,
    amount: 0,
    reason_code: 'EXCHANGE_COLL',
    date: '2017-04-28T03:05:07.493',
  },
  {
    id: 4993,
    currency_code: 'BTC' as CurrencyCode,
    change: -14.69001618,
    amount: 34.97163164,
    reason_code: 'EXCHANGE_COLL',
    date: '2017-04-28T03:05:07.493',
  },
];

export type CollateralHistoryItem = typeof collateralHistory[0];

export const tradingCommission = {
  commission_rate: 0.001,
};

export type TradingCommission = typeof tradingCommission;

export type ChildOrderEventType = 'ORDER' | 'ORDER_FAILED' | 'CANCEL' | 'CANCEL_FAILED' | 'EXECUTION' | 'EXPIRE';

export type ChildOrderEventRequired<T extends ChildOrderEventType> = {
  product_code: ProductCode,
  child_order_id: string,
  child_order_acceptance_id: string,
  event_date: string,
  event_type: T,
};

export type ChildOrderEventOptional = {
  child_order_type: OrderType,
  expire_date: string,
  reason: string,
  exec_id: number,
  side: Side,
  price: number,
  size: number,
  commission: number,
  sfd: number,
  outstanding_size: number,
}

export type ChildOrderEvent = (ChildOrderEventRequired<'ORDER'> & Pick<ChildOrderEventOptional, 'child_order_type' | 'expire_date' | 'side' | 'price' | 'size'>)
  | (ChildOrderEventRequired<'ORDER_FAILED'> & Pick<ChildOrderEventOptional, 'reason'>)
  | (ChildOrderEventRequired<'CANCEL'> & Pick<ChildOrderEventOptional, 'price' | 'size'>)
  | (ChildOrderEventRequired<'CANCEL_FAILED'>)
  | (ChildOrderEventRequired<'EXECUTION'> & Pick<ChildOrderEventOptional, 'expire_date' | 'exec_id' | 'side' | 'price' | 'size' | 'commission' | 'sfd' | 'outstanding_size'>)
  | (ChildOrderEventRequired<'EXPIRE'> & Pick<ChildOrderEventOptional, 'price' | 'size'>)

export const childOrderEvents: ChildOrderEvent[] = [
  {
    product_code: 'BTC_JPY',
    child_order_id: 'JOR20150101-070921-038077',
    child_order_acceptance_id: 'JRF20150101-070921-194057',
    event_date: '2015-01-01T07:09:21.9301772Z',
    event_type: 'ORDER',
    child_order_type: 'LIMIT',
    side: 'SELL',
    price: 500000,
    size: 0.12,
    expire_date: '2015-01-01T07:10:21',
  },
];

export type ParentOrderEventType = 'ORDER' | 'ORDER_FAILED' | 'CANCEL' | 'TRIGGER' | 'COMPLETE' | 'EXPIRE';

export type ParentOrderEventRequired<T extends ParentOrderEventType> = {
  product_code: ProductCode,
  parent_order_id: string,
  parent_order_acceptance_id: string,
  event_date: string,
  event_type: T,
};

export type ParentOrderEventOptional = {
  parent_order_type: ConditionType | OrderMethod,
  reason: string,
  child_order_type: OrderType,
  parameter_index: number,
  child_order_acceptance_id: string,
  side: Side,
  price: number,
  size: number,
  expire_date: string,
}

export type ParentOrderEvent = (ParentOrderEventRequired<'ORDER'> & Pick<ParentOrderEventOptional, 'parent_order_type' | 'expire_date'>)
| (ParentOrderEventRequired<'ORDER_FAILED'> & Pick<ParentOrderEventOptional, 'reason'>)
| (ParentOrderEventRequired<'CANCEL'>)
| (ParentOrderEventRequired<'TRIGGER'> & Pick<ParentOrderEventOptional, 'child_order_type' | 'parameter_index' | 'child_order_acceptance_id' | 'side' | 'price' | 'size' | 'expire_date'>)
| (ParentOrderEventRequired<'COMPLETE'> & Pick<ParentOrderEventOptional, 'parameter_index'| 'child_order_acceptance_id'>)
| (ParentOrderEventRequired<'EXPIRE'>)

export const parentOrderEvents: ParentOrderEvent[] = [
  {
    product_code: 'BTC_JPY',
    parent_order_id: 'JCP20150101-035534-486653',
    parent_order_acceptance_id: 'JRF20150101-035534-188098',
    event_date: '2015-01-01T03:55:34.9730659Z',
    event_type: 'TRIGGER',
    parameter_index: 1,
    child_order_type: 'LIMIT',
    side: 'BUY',
    price: 500000,
    size: 0.12,
    expire_date: '2015-01-02T02:35:34.8199789Z',
    child_order_acceptance_id: 'JRF20150101-035534-486668',
  },
];
