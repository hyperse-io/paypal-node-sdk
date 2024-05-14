import querystring from 'querystring';

/**
 Shows details for a refund, by ID.
 **/

export class RefundsGetRequest {
  public path: string;
  public verb: 'GET';
  public body: null;
  public headers: {
    'Content-Type': string;
  };

  constructor(refundId: string) {
    this.path = '/v2/payments/refunds/{refund_id}?';
    this.path = this.path.replace('{refund_id}', querystring.escape(refundId));
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
