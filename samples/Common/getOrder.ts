import { OrdersGetRequest } from '@hyperse-io/paypal-node-sdk';
import { createClient } from './payPalClient.js';

/**
 * This function can be used to retrieve an order by passing order Id as
 * argument.
 *
 * @param orderId
 * @returns
 */
export async function getOrder(orderId) {
  const request = new OrdersGetRequest(orderId);
  const response = await createClient().execute(request);
  console.log('Status Code: ' + response.statusCode);
  console.log('Status: ' + response.result.status);
  console.log('Order ID: ' + response.result.id);
  console.log('Intent: ' + response.result.intent);
  console.log('Links: ');
  response.result.links.forEach((item) => {
    const rel = item.rel;
    const href = item.href;
    const method = item.method;
    const message = `\t${rel}: ${href}\tCall Type: ${method}`;
    console.log(message);
  });
  console.log(
    `Gross Amount: ${response.result.purchase_units[0].amount.currency_code} ${response.result.purchase_units[0].amount.value}`
  );
  // To toggle print the whole body comment/uncomment the below line
  console.log(JSON.stringify(response.result, null, 4));
}
