import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

/*
 * Shows details for an authorized payment, by ID.
 */
export class AuthorizationsGetRequest extends HttpRequestBase {
  constructor(authorizationId) {
    super();
    this.path = '/v2/payments/authorizations/{authorization_id}?';
    this.path = this.path.replace(
      '{authorization_id}',
      querystring.escape(authorizationId)
    );
    this.verb = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
