import { OrdersValidateRequest } from 'src/orders/ordersValidateRequest.js';
import { createClient } from 'tests/test-utils.js';
const client = createClient();

describe('OrdersValidateRequest', () => {
  it('validates a card', async () => {
    const request = new OrdersValidateRequest('ORDER-ID');
    const r = await client.execute(request);
    expect(r.statusCode).toBe(200);
    expect(r.result).not.toBeNull();
  });
});
