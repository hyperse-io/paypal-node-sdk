import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

type CapturesRefundRequestBody = {
  //
};

/**
 * Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON request body.
 * For a partial refund, include an <code>amount</code> object in the JSON request body.
 */
export class CapturesRefundRequest extends HttpRequestBase<CapturesRefundRequestBody> {
  constructor(captureId) {
    super();
    this.path = '/v2/payments/captures/{capture_id}/refund?';
    this.path = this.path.replace(
      '{capture_id}',
      querystring.escape(captureId)
    );
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalRequestId(payPalRequestId: string) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
    return this;
  }

  payPalAuthAssertion(payPalAuthAssertionCode: string) {
    this.headers['PayPal-Auth-Assertion'] = payPalAuthAssertionCode;
    return this;
  }

  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(refundRequest: CapturesRefundRequestBody) {
    this.body = refundRequest;
    return this;
  }
}
