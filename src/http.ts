import { URL } from 'url';
import { of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs/operators';

type ProductCode = 'BTC_JPY' | 'FX_BTC_JPY' | 'ETH_BTC';

global.fetch = require('node-fetch');

export default class HttpClient {
  public static markets() {
    return HttpClient.get('markets', {});
  }

  public static board1(product?: ProductCode) {
    return HttpClient.get('board', { product_code: product });
  }

  public static ticker1(product?: ProductCode) {
    return HttpClient.get('ticker', { product_code: product });
  }

  public static executions1(product?: ProductCode) {
    return HttpClient.get('executions', { product_code: product });
  }

  public static boardState(product?: ProductCode) {
    return HttpClient.get('getboardstate', { product_code: product });
  }

  public static health(product?: ProductCode) {
    return HttpClient.get('gethealth', { product_code: product });
  }

  public static chats(from?: Date) {
    return HttpClient.get('getchats', { from_date: from?.toISOString() });
  }

  private static get(method: string, params: object) {
    const url = new URL(`https://api.bitflyer.com/v1/${method}`);
    // eslint-disable-next-line no-return-assign
    Object.entries(params).forEach(([k, v]) => url.search = `${k}=${v}`);
    return fromFetch(url.toString()).pipe(
      mergeMap((x) => (x.ok ? of(x.json()) : throwError(new Error(x.status.toString())))),
    );
  }
}
