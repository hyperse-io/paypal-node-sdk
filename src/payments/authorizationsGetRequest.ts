import querystring from 'querystring';

/**
 Shows details for an authorized payment, by ID.
 **/

export class AuthorizationsGetRequest {
  public path: string;
  public verb: 'GET';
  public body: null;
  public headers: {
    'Content-Type': string;
  };

  constructor(authorizationId) {
    this.path = '/v2/payments/authorizations/{authorization_id}?';
    this.path = this.path.replace(
      '{authorization_id}',
      querystring.escape(authorizationId)
    );
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
