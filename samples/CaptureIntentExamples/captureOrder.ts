import { createClient } from 'tests/test-utils.js';
import { orders } from '@hyperse/paypal-node-sdk';

/**
 * This function can be used to capture an order payment by passing the approved
 * order id as argument.
 *
 * @param orderId
 * @param debug
 * @returns
 */
export async function captureOrder(orderId, debug = false) {
  try {
    const request = new orders.OrdersCaptureRequest(orderId);
    request.requestBody({} as any);
    const response = await createClient().execute(request);
    if (debug) {
      console.log('Status Code: ' + response.statusCode);
      console.log('Status: ' + response.result.status);
      console.log('Order ID: ' + response.result.id);
      console.log('Links: ');
      response.result.links.forEach((item) => {
        const rel = item.rel;
        const href = item.href;
        const method = item.method;
        const message = `\t${rel}: ${href}\tCall Type: ${method}`;
        console.log(message);
      });
      console.log('Capture Ids:');
      response.result.purchase_units.forEach((item) => {
        item.payments.captures.forEach((item) => {
          console.log('\t' + item.id);
        });
      });
      // To toggle print the whole body comment/uncomment the below line
      console.log(JSON.stringify(response.result, null, 4));
    }
    return response;
  } catch (e) {
    console.log(e);
  }
}
