import { Headers, Request } from 'node-fetch';
import { URL } from 'url';
import { createHmac } from 'crypto';
import { from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map, mergeMap } from 'rxjs/operators';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

type ProductCode = 'BTC_JPY' | 'FX_BTC_JPY' | 'ETH_BTC';

export default class HttpClientAuth {
  private key: string;

  private secret: string;

  constructor(key: string, secret: string) {
    this.key = key;
    this.secret = secret;
  }

  public permissions() {
    return this.get('getpermissions', {});
  }

  public balance() {
    return this.get('getbalance', {});
  }

  public collateral() {
    return this.get('getcollateral', {});
  }

  public coinIns() {
    return this.get('getcoinins', {});
  }

  public coinOuts() {
    return this.get('getcoinouts', {});
  }

  public bankAccounts() {
    return this.get('getbankaccounts', {});
  }

  public deposits() {
    return this.get('getdeposits', {});
  }

  public withdraw(currencyCode: 'JPY', bankId: number, amount: number, code? : string) {
    return this.post('withdraw', {
      currency_code: currencyCode,
      bank_accound_id: bankId,
      amount,
      code,
    });
  }

  public widthdrawals() {
    return this.get('getwidthdrawals', {});
  }

  public sendChildOrder(product: ProductCode, orderType: 'LIMIT' | 'MARKET', side: 'BUY' | 'SELL', price: number, size: number) {
    return this.post('sendchildorder', {
      product_code: product,
      child_order_type: orderType,
      side,
      price,
      size,
    });
  }

  public cancelAllChildOrders(product: ProductCode) {
    return this.post('cancelallchildorders', { product_code: product });
  }

  public positions(product: 'FX_BTC_JPY') {
    return this.get('getcollateralhistory', { product_code: product });
  }

  public collateralHistory() {
    return this.get('getcollateralhistory', {});
  }

  public tradingCommission(product: ProductCode) {
    return this.get('gettradingcommission', { product_code: product });
  }

  private get(method: string, params: object) {
    return this.request('GET', `/v1/me/${method}`, params);
  }

  private post(method: string, params: object) {
    return this.request('POST', `/v1/me/${method}`, {}, params);
  }

  private request(method: 'GET' | 'POST', path: string, query: object, bodyObj?: object) {
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
    return fromFetch(request).pipe(
      mergeMap((x) => from(x.text())),
      map((x) => (x ? JSON.parse(x) : null)),
    );
  }
}
