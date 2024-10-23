import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseWebhookHeaders } from '../types/type-webhook.js';

type WebhookUpdateRequestBody = {
  /**
   * The operation.
   */
  op: 'add' | 'replace' | 'remove' | 'move' | 'copy';
  /**
   * The JSON Pointer to the target document location at which to complete the operation.
   * @example `/event_types`
   */
  path: string;
  /**
   * The value to apply. The remove operation does not require a value.
   * [ { "name": "PAYMENT.SALE.REFUNDED" } ]
   */
  value: string | Array<{ name: string }>;
  /**
   * The JSON Pointer to the target document location from which to move the value. Required for the move operation.
   */
  from?: string;
};

/**
 * Updates a webhook to replace webhook fields with new values. Supports only the replace operation.
 * Pass a json_patch object with replace operation and path, which is /url for a URL or /event_types for events. The value is either the URL or a list of events.
 * @see {@link https://developer.paypal.com/docs/api/webhooks/v1/#webhooks_update}
 *
 */
export class WebhookUpdateRequest extends HttpRequestBase<
  BaseWebhookHeaders,
  WebhookUpdateRequestBody
> {
  constructor(webhookId: string) {
    super();
    this.verb = 'PATCH';
    this.path = '/v1/notifications/webhooks/{webhook_id}?';
    this.path = this.path.replace(
      '{webhook_id}',
      querystring.escape(webhookId)
    );
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  requestBody(updateRequest: WebhookUpdateRequestBody) {
    this.body = updateRequest;
    return this;
  }
}
