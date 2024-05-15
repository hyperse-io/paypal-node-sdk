import { payments } from '@hyperse-io/paypal-node-sdk';
import { createClient } from './payPalClient.js';
/**
 * This method can be used to refund the capture. This function should be called
 * with valid captureId in the argument.
 *
 * @param captureId
 * @param debug
 * @returns
 */
export async function refundOrder(captureId, debug = false) {
  try {
    const request = new payments.CapturesRefundRequest(captureId);
    request.requestBody({
      amount: {
        value: '20.00',
        currency_code: 'USD',
      },
    } as any);
    const response = await createClient().execute(request);
    if (debug) {
      console.log('Status Code: ' + response.statusCode);
      console.log('Status: ' + response.result.status);
      console.log('Refund ID: ' + response.result.id);
      console.log('Links:');
      response.result.links.forEach((item) => {
        const rel = item.rel;
        const href = item.href;
        const method = item.method;
        const message = `\t${rel}: ${href}\tCall Type: ${method}`;
        console.log(message);
      });
      // To toggle print the whole body comment/uncomment the below line
      console.log(JSON.stringify(response.result, null, 4));
    }
    return response;
  } catch (e) {
    console.log(e);
  }
}
