import querystring from 'querystring';

/**
 Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON request body. For a partial refund, include an <code>amount</code> object in the JSON request body.
 **/

export class CapturesRefundRequest {
  public path: string;
  public verb: 'POST';
  public body: any;
  public headers: {
    'Content-Type': string;
    'PayPal-Request-Id'?: string;
    'PayPal-Auth-Assertion'?: string;
    Prefer?: string;
  };

  constructor(captureId) {
    this.path = '/v2/payments/captures/{capture_id}/refund?';
    this.path = this.path.replace(
      '{capture_id}',
      querystring.escape(captureId)
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

  payPalAuthAssertion(payPalAuthAssertionCode) {
    this.headers['PayPal-Auth-Assertion'] = payPalAuthAssertionCode;
    return this;
  }

  prefer(prefer) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(refundRequest) {
    this.body = refundRequest;
    return this;
  }
}
