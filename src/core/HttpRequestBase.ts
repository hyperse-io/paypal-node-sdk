import { type HttpHeaders, type HttpRequest } from '@paypal/paypalhttp';

export class HttpRequestBase<T extends object = object>
  implements HttpRequest<T>
{
  public body: T;
  public headers: HttpHeaders;
  public path: string;
  public verb:
    | 'CONNECT'
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'OPTIONS'
    | 'PATCH'
    | 'POST'
    | 'PUT';

  constructor() {
    this.body = null as unknown as T;
  }
}
