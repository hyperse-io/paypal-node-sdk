import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseWebhookHeaders } from '../types/type-webhook.js';

type WebhookCreateRequestBody = {
  /**
   * The URL that is configured to listen on localhost for incoming POST notification messages that contain event information.
   * https://example.com/example_webhook
   */
  url: string;
  /**
   * An array of events to which to subscribe your webhook. To subscribe to all events, including events as they are added, specify the asterisk wild card.
   * To replace the event_types array, specify the asterisk wild card. To list all supported events: @link https://developer.paypal.com/docs/api/webhooks/v1/#event-type_list
   * [ { "name": "PAYMENT.AUTHORIZATION.CREATED" }, { "name": "PAYMENT.AUTHORIZATION.VOIDED" } ]
   */
  event_types: Array<{ name: string }>;
};

/**
 * Subscribes your webhook listener to events.
 * @see {@link https://developer.paypal.com/docs/api/webhooks/v1/#webhooks_post}
 */
export class WebhookCreateRequest extends HttpRequestBase<
  BaseWebhookHeaders,
  WebhookCreateRequestBody
> {
  constructor() {
    super();
    this.verb = 'POST';
    this.path = '/v1/notifications/webhooks';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  requestBody(createRequest: WebhookCreateRequestBody) {
    this.body = createRequest;
    return this;
  }
}
