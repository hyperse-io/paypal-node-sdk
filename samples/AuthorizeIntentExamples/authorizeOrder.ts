import { createClient } from 'samples/Common/payPalClient.js';
import { orders } from '@hyperse/paypal-node-sdk';

/**
 * This function can be used to perform authorization on the approved order.
 * An valid approved order id should be passed as an argument to this function.
 *
 * @param orderId
 * @param debug
 * @returns
 */
export async function authorizeOrder(orderId, debug = false) {
  try {
    const request = new orders.OrdersAuthorizeRequest(orderId);
    request.requestBody({});
    const response = await createClient().execute(request);
    if (debug) {
      console.log('Status Code: ' + response.statusCode);
      console.log('Status: ' + response.result.status);
      console.log(
        'Authorization ID: ',
        response.result.purchase_units[0].payments.authorizations[0].id
      );
      console.log('Order ID: ' + response.result.id);
      console.log('Links: ');
      response.result.links.forEach((item) => {
        const rel = item.rel;
        const href = item.href;
        const method = item.method;
        const message = `\t${rel}: ${href}\tCall Type: ${method}`;
        console.log(message);
      });
      console.log('Authorization Links:');
      response.result.purchase_units[0].payments.authorizations[0].links.forEach(
        (item) => {
          const rel = item.rel;
          const href = item.href;
          const method = item.method;
          const message = `\t${rel}: ${href}\tCall Type: ${method}`;
          console.log(message);
        }
      );
      // To toggle print the whole body comment/uncomment the below line
      console.log(JSON.stringify(response.result, null, 4));
    }
    return response;
  } catch (e) {
    console.log(e);
  }
}
