import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseWebhookHeaders } from '../types/type-webhook.js';

/**
 * Subscribes your webhook listener to events.
 * @see {@link https://developer.paypal.com/docs/api/webhooks/v1/#webhooks_post}
 */
export class WebhookDetailRequest extends HttpRequestBase<BaseWebhookHeaders> {
  constructor(webhookId: string) {
    super();
    this.verb = 'GET';
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
