export interface BaseHeaders {
  /**
   * Will automatically be set to `Authorization` header value while http client
   */
  Authorization?: string;
}

export interface BaseRequest<H, B = null> {
  readonly path: string;
  readonly verb:
    | 'CONNECT'
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'OPTIONS'
    | 'PATCH'
    | 'POST'
    | 'PUT';
  readonly body: B;
  readonly headers: H;
}

export class HttpRequestBase<H extends BaseHeaders, B = null>
  implements BaseRequest<H, B>
{
  path: string;
  verb:
    | 'CONNECT'
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'OPTIONS'
    | 'PATCH'
    | 'POST'
    | 'PUT';
  body: B;
  headers: H;

  constructor() {
    this.body = null as any;
  }
}
