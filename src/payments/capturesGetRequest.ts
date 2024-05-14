import querystring from 'querystring';
/**
 Shows details for a captured payment, by ID.
 **/

export class CapturesGetRequest {
  public path: string;
  public verb: 'GET';
  public body: null;
  public headers: {
    'Content-Type': string;
  };

  constructor(captureId) {
    this.path = '/v2/payments/captures/{capture_id}?';
    this.path = this.path.replace(
      '{capture_id}',
      querystring.escape(captureId)
    );
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
