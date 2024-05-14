import querystring from 'querystring';

/**
 Reauthorizes an authorized PayPal account payment, by ID. 
 To ensure that funds are still available, reauthorize an authorized payment after its initial three-day honor period expires.
 <br/><br/>After the three-day honor period expires, you can reauthorize an authorized payment only once from days four to 29. If 30 days have passed since the date of the authorized payment, you must create an authorized payment instead.
 <br/><br/>A reauthorized payment itself has a new three-day honor period. You can reauthorize an authorized payment once for up to 115% of the original authorized amount and not to exceed an increase of $75 USD.<br/><br/>Supports the <code>amount</code> request parameter only.
 **/
export class AuthorizationsReauthorizeRequest {
  public path: string;
  public verb: 'POST';
  public body: any;
  public headers: {
    'Content-Type': string;
    'PayPal-Request-Id'?: string;
    Prefer?: string;
  };

  constructor(authorizationId) {
    this.path = '/v2/payments/authorizations/{authorization_id}/reauthorize?';
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

  requestBody(reauthorizeRequest) {
    this.body = reauthorizeRequest;
    return this;
  }
}
