import { AuthorizationsCaptureRequest } from '@hyperse-io/paypal-node-sdk';
import { createClient } from 'samples/Common/payPalClient.js';

/**
 * This function can be used to capture the payment on an authorized Order.
 * An Valid authorization Id should be passed as an argument to this method.
 *
 * @param authId
 * @param debug
 * @returns
 */
export async function captureOrder(authId, debug = false) {
  try {
    const request = new AuthorizationsCaptureRequest(authId);
    request.requestBody({});
    const response = await createClient().execute(request);
    if (debug) {
      console.log('Status Code: ' + response.statusCode);
      console.log('Status: ' + response.result.status);
      console.log('Capture ID: ' + response.result.id);
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
