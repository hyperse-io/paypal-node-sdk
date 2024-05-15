import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

/**
 * Shows details for a captured payment, by ID.
 */
export class CapturesGetRequest extends HttpRequestBase {
  constructor(captureId: string) {
    super();
    this.path = '/v2/payments/captures/{capture_id}?';
    this.path = this.path.replace(
      '{capture_id}',
      querystring.escape(captureId)
    );
    this.verb = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
