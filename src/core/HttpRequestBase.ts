import { type HttpVerb } from '../http/types.js';

export interface BaseHeaders {
  /**
   * Will automatically be set to `Authorization` header value while http client
   */
  Authorization?: string;
}

export interface BaseRequest<H, B = null> {
  readonly path: string;
  readonly verb: HttpVerb;
  readonly body: B;
  readonly headers: H;
}

export class HttpRequestBase<
  H extends BaseHeaders,
  B = null,
> implements BaseRequest<H, B> {
  path: string;
  verb: HttpVerb;
  body: B;
  headers: H;

  constructor() {
    this.body = null as any;
  }
}
