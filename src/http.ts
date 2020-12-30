import { URL } from 'url';
import fetch from 'node-fetch';
import type * as Types from './types';

export default class HttpClient {
  public static markets() {
    return HttpClient.get<Types.Market[]>('markets', {});
  }

  public static board1(product?: Types.ProductCode) {
    return HttpClient.get<Types.Board>('board', { product_code: product });
  }

  public static ticker1(product?: Types.ProductCode) {
    return HttpClient.get<Types.Ticker>('ticker', { product_code: product });
  }

  public static executions1(product?: Types.ProductCode) {
    return HttpClient.get<Types.Execution[]>('executions', { product_code: product });
  }

  public static boardState(product?: Types.ProductCode) {
    return HttpClient.get<{ health: Types.Health, state: Types.BoardState }>('getboardstate', { product_code: product });
  }

  public static health(product?: Types.ProductCode) {
    return HttpClient.get<{ status: Types.Health }>('gethealth', { product_code: product });
  }

  public static chats(from?: Date) {
    return HttpClient.get<Types.Chat[]>('getchats', { from_date: from?.toISOString() });
  }

  private static async get<T>(method: string, params: object) {
    const url = new URL(`https://api.bitflyer.com/v1/${method}`);
    // eslint-disable-next-line no-return-assign
    Object.entries(params).forEach(([k, v]) => url.search = `${k}=${v}`);
    const res = await fetch(url.toString());
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
