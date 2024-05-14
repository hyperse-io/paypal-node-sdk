import querystring from 'querystring';

/**
 Shows details for an order, by ID.
 **/

export class OrdersGetRequest {
  public path: string;
  public verb: 'GET';
  public body: null;
  public headers: {
    'Content-Type': string;
  };

  constructor(orderId) {
    this.path = '/v2/checkout/orders/{order_id}?';
    this.path = this.path.replace('{order_id}', querystring.escape(orderId));
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
