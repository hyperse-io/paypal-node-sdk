import querystring from 'querystring';

/**
 Captures an authorized payment, by ID.
 **/

export class AuthorizationsCaptureRequest {
  public path: string;
  public verb: 'POST';
  public body: any;
  public headers: {
    'Content-Type': string;
    'PayPal-Request-Id'?: string;
    Prefer?: string;
  };

  constructor(authorizationId) {
    this.path = '/v2/payments/authorizations/{authorization_id}/capture?';
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

  payPalRequestId(payPalRequestId) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
    return this;
  }

  prefer(prefer) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(capture) {
    this.body = capture;
    return this;
  }
}
