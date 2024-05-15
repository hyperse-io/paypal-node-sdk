import { type BaseHeaders } from '../core/HttpRequestBase.js';

/**
 * @example
 *```json
 *{
 *  "id": "WH-652880104N329422Y-06P85183JY752714D",
 *  "event_version": "1.0",
 *  "create_time": "2024-05-14T09:11:54.338Z",
 *  "resource_type": "capture",
 *  "resource_version": "2.0",
 *  "event_type": "PAYMENT.CAPTURE.COMPLETED",
 *  "summary": "Payment completed for $ 21.12 USD",
 *  "resource": {
 *    "payee": {
 *      "email_address": "sb-fdqcq8228780@business.example.com",
 *      "merchant_id": "2WSC6PDTGSDX4"
 *    },
 *    "amount": { "value": "21.12", "currency_code": "USD" },
 *    "seller_protection": {
 *      "dispute_categories": ["ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION"],
 *      "status": "ELIGIBLE"
 *    },
 *    "supplementary_data": {
 *      "related_ids": { "order_id": "10581139X0233013B" }
 *    },
 *    "update_time": "2024-05-14T09:11:50Z",
 *    "create_time": "2024-05-14T09:11:50Z",
 *    "final_capture": true,
 *    "seller_receivable_breakdown": {
 *      "paypal_fee": { "value": "1.12", "currency_code": "USD" },
 *      "gross_amount": { "value": "21.12", "currency_code": "USD" },
 *      "net_amount": { "value": "20.00", "currency_code": "USD" }
 *    },
 *    "links": [
 *      {
 *        "method": "GET",
 *        "rel": "self",
 *        "href": "https://api.sandbox.paypal.com/v2/payments/captures/9XF14200T8003681K"
 *      },
 *      {
 *        "method": "POST",
 *        "rel": "refund",
 *        "href": "https://api.sandbox.paypal.com/v2/payments/captures/9XF14200T8003681K/refund"
 *      },
 *      {
 *        "method": "GET",
 *        "rel": "up",
 *        "href": "https://api.sandbox.paypal.com/v2/checkout/orders/10581139X0233013B"
 *      }
 *    ],
 *    "id": "9XF14200T8003681K",
 *    "status": "COMPLETED"
 *  },
 *  "links": [
 *    {
 *      "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-652880104N329422Y-06P85183JY752714D",
 *      "rel": "self",
 *      "method": "GET"
 *    },
 *    {
 *      "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-652880104N329422Y-06P85183JY752714D/resend",
 *      "rel": "resend",
 *      "method": "POST"
 *    }
 *  ]
 *}
 *```
 */
export interface WebhookEvent {
  /**
   * The resource version in the webhook notification.
   */
  resource_version: string;
  /**
   * The event version in the webhook notification.
   */
  event_version: string;

  /**
   * others
   */
  [index: string]: any;
}

export interface BaseWebhookHeaders extends BaseHeaders {
  'Content-Type': 'application/json';
}
