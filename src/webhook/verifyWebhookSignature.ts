import { HttpRequestBase } from '../core/HttpRequestBase.js';
import {
  type WebhookEvent,
  type BaseWebhookHeaders,
} from '../types/type-webhook.js';

export type VerifyWebhookSignatureBody = {
  /**
   * The ID of the HTTP transmission. Contained in the PAYPAL-TRANSMISSION-ID header of the notification message.
   * '69cd13f0-d67a-11e5-baa3-778b53f4ae55';
   */
  transmission_id: string;
  /**
   * The date and time of the HTTP transmission, in Internet date and time format. Appears in the PAYPAL-TRANSMISSION-TIME header of the notification message.
   * '2016-02-18T20:01:35Z';
   */
  transmission_time: string;
  /**
   * The X.509 public key certificate. Download the certificate from this URL and use it to verify the signature.
   * Extract this value from the PAYPAL-CERT-URL response header, which is received with the webhook notification.
   */
  cert_url: string;
  /**
   * The algorithm that PayPal uses to generate the signature and that you can use to verify the signature.
   * Extract this value from the PAYPAL-AUTH-ALGO response header, which is received with the webhook notification.
   */
  auth_algo: string;
  /**
   * The PayPal-generated asymmetric signature. Appears in the PAYPAL-TRANSMISSION-SIG header of the notification message.
   */
  transmission_sig: string;
  /**
   * The ID of the webhook as configured in your Developer Portal account.
   */
  webhook_id: string;
  /**
   * A webhook event notification.
   */
  webhook_event: WebhookEvent;
};

/**
 * Verifies a webhook signature.
 * @see {@link https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature_post}
 *
 */
export class VerifyWebhookSignature extends HttpRequestBase<
  BaseWebhookHeaders,
  VerifyWebhookSignatureBody
> {
  constructor() {
    super();
    this.path = '/v1/notifications/verify-webhook-signature?';
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalRequestId(payPalRequestId: string) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
    return this;
  }
  /**
   * 1. return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links.
   * 2. return=representation. The server returns a complete resource representation, including the current state of the resource.
   * @default `return=minimal`
   */
  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(signature: VerifyWebhookSignatureBody) {
    this.body = signature;
    return this;
  }
}
