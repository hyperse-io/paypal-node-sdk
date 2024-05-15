import { HttpRequestBase } from '../core/HttpRequestBase.js';
import {
  type CheckoutPaymentIntent,
  type BaseOrderHeaders,
  type Payer,
  type PurchaseUnitRequest,
  type OrderApplicationContext,
} from './types.js';

export type OrdersCreateRequestBody = {
  intent: CheckoutPaymentIntent;
  payer?: Payer;
  purchase_units: PurchaseUnitRequest[];
  application_context?: OrderApplicationContext;
};

export interface OrdersCreateRequestHeaders extends BaseOrderHeaders {
  'PayPal-Partner-Attribution-Id'?: string;
  Prefer?: string;
}

/**
 * Creates an order.
 */
export class OrdersCreateRequest extends HttpRequestBase<
  OrdersCreateRequestHeaders,
  OrdersCreateRequestBody
> {
  constructor() {
    super();
    this.path = '/v2/checkout/orders?';
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalPartnerAttributionId(payPalPartnerAttributionId: string) {
    this.headers['PayPal-Partner-Attribution-Id'] = payPalPartnerAttributionId;
    return this;
  }

  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(order: OrdersCreateRequestBody) {
    this.body = order;
    return this;
  }
}
