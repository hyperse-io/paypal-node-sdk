import { OrdersCreateRequest } from '../../src/orders/ordersCreateRequest.js';
import { createClient } from '../test-utils.js';

export const client = await createClient();

function buildRequestBody() {
  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '100.00',
        },
      },
    ],
  };
}

export async function createOrder() {
  const request = new OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody(buildRequestBody() as any);
  return await client.execute(request);
}
