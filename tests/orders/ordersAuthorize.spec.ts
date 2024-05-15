import { OrdersAuthorizeRequest } from 'src/orders/ordersAuthorizeRequest.js';
import { createClient } from 'tests/test-utils.js';
const client = createClient();

describe('OrdersAuthorizeRequest', () => {
  it('authorizes an order', async () => {
    // This test is an example, in production, orders will require payer approval
    const request = new OrdersAuthorizeRequest('ORDER-ID');
    const result = await client.execute(request);
    expect(result.statusCode).toBe(201);
    expect(result.result).not.toBeNull();
  });
});
