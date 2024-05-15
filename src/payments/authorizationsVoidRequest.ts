import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

type AuthorizationsVoidRequestBody = {
  //
};

/**
 * Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that has been fully captured.
 */
export class AuthorizationsVoidRequest extends HttpRequestBase<AuthorizationsVoidRequestBody> {
  constructor(authorizationId: string) {
    super();
    this.path = '/v2/payments/authorizations/{authorization_id}/void?';
    this.path = this.path.replace(
      '{authorization_id}',
      querystring.escape(authorizationId)
    );
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
