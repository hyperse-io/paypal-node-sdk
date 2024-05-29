import { HttpRequestBase } from '../core/HttpRequestBase.js';
import {
  type BaseOrderHeaders,
  type CheckoutPaymentIntent,
  type OrderApplicationContext,
  type Payer,
  type PurchaseUnitRequest,
} from '../types/type-order.js';

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
 * @see {@link https://developer.paypal.com/api/orders/v2/#orders_create}
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

  /**
   * 1. return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links.
   * 2. return=representation. The server returns a complete resource representation, including the current state of the resource.
   * @default `return=minimal`
   */
  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(order: OrdersCreateRequestBody) {
    this.body = order;
    return this;
  }
}
