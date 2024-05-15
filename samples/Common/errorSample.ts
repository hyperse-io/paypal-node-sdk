import { OrdersCreateRequest } from '@hyperse-io/paypal-node-sdk';
import { createClient, prettyPrint } from './payPalClient.js';

/**
 * Body has no required parameters (intent, purchase_units)
 */
async function createError1() {
  try {
    const request = new OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({});
    console.log(`Request Body:\n${JSON.stringify(request.body, null, 4)}`);
    console.log('Response:');
    await createClient().execute(request);
  } catch (e: any) {
    const message = JSON.parse(e.message);
    console.log(await prettyPrint(message));
  }
}

/**
 * Body has invalid parameter value for intent
 */
async function createError2() {
  try {
    const request = new OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'INVALID',
      purchase_units: [{ amount: { currency_code: 'USD', value: '100.00' } }],
    });
    console.log(`Request Body:\n${JSON.stringify(request.body, null, 4)}`);
    console.log('Response:');
    await createClient().execute(request);
  } catch (e: any) {
    const message = JSON.parse(e.message);
    console.log('Status Code:', e.statusCode);
    console.log(await prettyPrint(message));
  }
}

(async () => {
  console.log(
    'Calling createError1 (Body has no required parameters (intent, purchase_units))'
  );
  await createError1();
  console.log(
    '\nExecuting createError2 (Body has invalid parameter value for intent)'
  );
  await createError2();
})();
