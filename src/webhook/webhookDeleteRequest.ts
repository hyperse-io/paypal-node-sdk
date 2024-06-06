import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseWebhookHeaders } from '../types/type-webhook.js';

/**
 * Delete webhook, Deletes a webhook, by ID.
 * @see {@link https://developer.paypal.com/docs/api/webhooks/v1/#webhooks_delete}
 *
 */
export class WebhookDeleteRequest extends HttpRequestBase<BaseWebhookHeaders> {
  constructor(webhookId: string) {
    super();
    this.verb = 'DELETE';
    this.path = '/v1/notifications/webhooks/{webhook_id}?';
    this.path = this.path.replace(
      '{webhook_id}',
      querystring.escape(webhookId)
    );
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
