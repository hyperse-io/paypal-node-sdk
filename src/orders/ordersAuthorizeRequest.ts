import querystring from 'querystring';

/**
 Authorizes payment for an order. The response shows authorization details.
 **/

export class OrdersAuthorizeRequest {
  public path: string;
  public verb: 'POST';
  public body: any;
  public headers: {
    'Content-Type': string;
    'PayPal-Client-Metadata-Id'?: string;
    'PayPal-Request-Id'?: string;
    Prefer?: string;
  };

  constructor(orderId: string) {
    this.path = '/v2/checkout/orders/{order_id}/authorize?';
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

  payPalRequestId(payPalRequestId) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
    return this;
  }

  prefer(prefer) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(orderActionRequest) {
    this.body = orderActionRequest;
    return this;
  }
}
