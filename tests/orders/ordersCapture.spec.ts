import { OrdersCaptureRequest } from '../../src/orders/ordersCaptureRequest.js';
import { ORDER_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('OrdersCaptureRequest', () => {
  it('captures an order', async () => {
    // This test is an example, in production, orders will require payer approval
    const request = new OrdersCaptureRequest(ORDER_ID);
    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const captureOrder = res.result;
    expect(captureOrder).not.toBeNull();

    expect(captureOrder.id).not.toBeNull();
    expect(captureOrder.purchase_units).not.toBeNull();
    expect(captureOrder.purchase_units.length).toBe(1);

    const firstPurchaseUnit = captureOrder.purchase_units[0];
    expect(firstPurchaseUnit.reference_id).toBe('default');
    expect(firstPurchaseUnit.amount.currency_code).toBe('USD');
    expect(firstPurchaseUnit.amount.value).toBe('100.00');
    expect(firstPurchaseUnit.payments.captures).not.toBeNull();
    expect(firstPurchaseUnit.payments.captures[0].links.length).toBe(3);

    expect(captureOrder.create_time).not.toBeNull();
    expect(captureOrder.links).not.toBeNull();
  });
});
