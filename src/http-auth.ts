import fetch, { Headers, Request } from 'node-fetch';
import { URL } from 'url';
import { createHmac } from 'crypto';
import type * as Types from './types';

export default class HttpClientAuth {
  private key: string;

  private secret: string;

  constructor(key?: string, secret?: string) {
    if (!key || !secret) {
      throw new Error('API key and/or secret are required.');
    }
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

  public collateralAccounts() {
    return this.get<Types.CollateralAccount[]>('getcollateralaccounts', {});
  }

  public addresses() {
    return this.get<Types.Address[]>('getaddresses', {});
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

  public cancelChildOrder(
    body: Types.CancelChildOrder,
  ) {
    return this.post('cancelchildorder', body);
  }

  public sendParentOrder(body: Types.ParentOrderBody) {
    return this.post('sendparentorder', body);
  }

  public cancelParentOrder(body: Types.CancelParentOrder) {
    return this.post('cancelparentorder', body);
  }

  public cancelAllChildOrders(product: Types.ProductCode) {
    return this.post('cancelallchildorders', { product_code: product });
  }

  public childOrders(product: Types.ProductCode) {
    return this.get<Types.ChildOrder[]>('getchildorders', { product_code: product });
  }

  public parentOrders(product: Types.ProductCode) {
    return this.get<Types.ParentOrder[]>('getparentorders', { product_code: product });
  }

  public parentOrderDetail(id: string) {
    return this.get<Types.ParentOrderDetail>('getparentorder', { parent_order_id: id });
  }

  public executions(product: Types.ProductCode) {
    return this.get<Types.Execution[]>('getexecutions', { product_code: product });
  }

  public balanceHistory(currency: Types.CurrencyCode) {
    return this.get<Types.BalanceHistoryItem[]>('getbalancehistory', { currency_code: currency });
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
