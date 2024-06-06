import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseWebhookHeaders } from '../types/type-webhook.js';

/**
 * Lists webhooks for an app.
 * @see {@link https://developer.paypal.com/docs/api/webhooks/v1/#webhooks_list}
 *
 */
export class WebhookListRequest extends HttpRequestBase<BaseWebhookHeaders> {
  constructor(anchorType: 'APPLICATION' | 'ACCOUNT' = 'APPLICATION') {
    super();
    this.verb = 'GET';
    this.path = '/v1/notifications/webhooks?anchor_type={anchor_type}';
    this.path = this.path.replace(
      '{anchor_type}',
      querystring.escape(anchorType)
    );
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
