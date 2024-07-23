import { OrdersCreateRequest } from '../../src/orders/ordersCreateRequest.js';
import { createClient } from '../test-utils.js';

const client = createClient();

function buildRequestBody() {
  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: 'test_ref_id1',
        amount: {
          currency_code: 'USD',
          value: '100.00',
        },
      },
    ],
  };
}

export function createOrder() {
  const request = new OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody(buildRequestBody() as any);
  return client.execute(request);
}
