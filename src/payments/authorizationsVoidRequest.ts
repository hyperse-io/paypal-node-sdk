import querystring from 'querystring';

/**
 Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that has been fully captured.
 **/

export class AuthorizationsVoidRequest {
  public path: string;
  public verb: 'POST';
  public body: null;
  public headers: {
    'Content-Type': string;
  };

  constructor(authorizationId) {
    this.path = '/v2/payments/authorizations/{authorization_id}/void?';
    this.path = this.path.replace(
      '{authorization_id}',
      querystring.escape(authorizationId)
    );
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
