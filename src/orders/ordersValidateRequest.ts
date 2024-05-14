import querystring from 'querystring';

/**
 Validates a payment method and checks it for contingencies.
 **/

export class OrdersValidateRequest {
  public path: string;
  public verb: 'POST';
  public body: any;
  public headers: {
    'Content-Type': string;
    'PayPal-Client-Metadata-Id'?: string;
  };

  constructor(orderId) {
    this.path = '/v2/checkout/orders/{order_id}/validate-payment-method?';
    this.path = this.path.replace('{order_id}', querystring.escape(orderId));
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalClientMetadataId(payPalClientMetadataId) {
    this.headers['PayPal-Client-Metadata-Id'] = payPalClientMetadataId;
    return this;
  }

  requestBody(orderActionRequest) {
    this.body = orderActionRequest;
    return this;
  }
}
