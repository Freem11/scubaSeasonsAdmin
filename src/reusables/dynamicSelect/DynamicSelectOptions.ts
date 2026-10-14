import { Option } from '../select';

export type DynamicSelectResult = {
  options:    Option[]
  totalCount: number | null
};

/**
 * A list response. An HTTP client can attach the response headers
 * (x-total-count) to the array. A Supabase result carries no headers.
 */
export type DynamicSelectResponse<TItem> = TItem[] & {
  headers?: Record<string, string>
};

export class DynamicSelectOptions<TItem = Option> {
  convertItem(item: TItem): Option {
    return item as Option;
  }

  convertItems(items?: TItem[] | null): DynamicSelectResult {
    const result: DynamicSelectResult = { options: [], totalCount: 0 };
    if (items?.length) {
      result.options = items.filter(item => !!item).map(item => this.convertItem(item));
      result.totalCount = result.options.length;
    }
    return result;
  }

  convertHttpResponse(response: DynamicSelectResponse<TItem>): DynamicSelectResult {
    const result: DynamicSelectResult = { options: [], totalCount: 0 };

    if (response?.length === 0) {
      return result;
    }

    result.options = response.map(item => this.convertItem(item));

    const headers = response.headers;
    if (headers && Object.prototype.hasOwnProperty.call(headers, 'x-total-count')) {
      result.totalCount = parseInt(headers['x-total-count']);
    } else {
      result.totalCount = null;
    }

    return result;
  }
}
