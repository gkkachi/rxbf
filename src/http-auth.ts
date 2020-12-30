import fetch, { Headers, Request } from 'node-fetch';
import { URL } from 'url';
import { createHmac } from 'crypto';
import type * as Types from './types';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

export default class HttpClientAuth {
  private key: string;

  private secret: string;

  constructor(key: string, secret: string) {
    this.key = key;
    this.secret = secret;
  }

  public permissions() {
    return this.get<string[]>('getpermissions', {});
  }

  public balance() {
    return this.get<Types.BalanceItem[]>('getbalance', {});
  }

  public collateral() {
    return this.get<Types.Collateral>('getcollateral', {});
  }

  public coinIns() {
    return this.get<Types.CoinIn[]>('getcoinins', {});
  }

  public coinOuts() {
    return this.get<Types.CoinOut[]>('getcoinouts', {});
  }

  public bankAccounts() {
    return this.get<Types.BankAccount[]>('getbankaccounts', {});
  }

  public deposits() {
    return this.get<Types.Deposit[]>('getdeposits', {});
  }

  public withdraw(body: Types.Withdraw) {
    return this.post('withdraw', body);
  }

  public widthdrawals() {
    return this.get<Types.Withdrawal[]>('getwidthdrawals', {});
  }

  public sendChildOrder(
    body: Types.ChildOrderBody,
  ) {
    return this.post('sendchildorder', body);
  }

  public cancelAllChildOrders(product: Types.ProductCode) {
    return this.post('cancelallchildorders', { product_code: product });
  }

  public positions(product: 'FX_BTC_JPY') {
    return this.get<Types.Position[]>('getpositions', { product_code: product });
  }

  public collateralHistory() {
    return this.get<Types.CollateralHistoryItem[]>('getcollateralhistory', {});
  }

  public tradingCommission(product: Types.ProductCode) {
    return this.get<Types.TradingCommission>('gettradingcommission', { product_code: product });
  }

  private get<T>(method: string, params: object) {
    return this.request<T>('GET', `/v1/me/${method}`, params);
  }

  private post<T>(method: string, params: object) {
    return this.request<T>('POST', `/v1/me/${method}`, {}, params);
  }

  private async request<T>(method: 'GET' | 'POST', path: string, query: object, bodyObj?: object) {
    const url = new URL(`https://api.bitflyer.com${path}`);
    // eslint-disable-next-line no-return-assign
    if (query)Object.entries(query).forEach(([k, v]) => url.search = `${k}=${v}`);
    const timestamp = Date.now().toString();
    const body = bodyObj ? JSON.stringify(bodyObj) : '';
    const text = timestamp + method + url.pathname + url.search + body;
    const sign = createHmac('sha256', this.secret).update(text).digest('hex');
    const headers = new Headers();
    headers.append('ACCESS-KEY', this.key);
    headers.append('ACCESS-TIMESTAMP', timestamp);
    headers.append('ACCESS-SIGN', sign);
    headers.append('Content-Type', 'application/json');
    const request = method === 'GET'
      ? new Request(url.toString(), { headers, method })
      : new Request(url.toString(), { headers, method, body });
    const res = await fetch(request);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    try {
      return await res.json() as T;
    } catch {
      return null;
    }
  }
}
