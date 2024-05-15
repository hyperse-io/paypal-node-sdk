import { OrdersCaptureRequest } from 'src/orders/ordersCaptureRequest.js';
import { createClient } from 'tests/test-utils.js';

const client = createClient();

describe('OrdersCaptureRequest', () => {
  it('captures an order', async () => {
    // This test is an example, in production, orders will require payer approval
    const request = new OrdersCaptureRequest('ORDER-ID');

    const result = await client.execute(request);
    expect(result.statusCode).toBe(201);
    expect(result.result).not.toBeNull();
  });
});
