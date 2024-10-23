import { OrdersAuthorizeRequest } from '../../src/orders/ordersAuthorizeRequest.js';
import { ORDER_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('OrdersAuthorizeRequest', () => {
  it('authorizes an order', async () => {
    // This test is an example, in production, orders will require payer approval
    const request = new OrdersAuthorizeRequest(ORDER_ID);
    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const authOrder = res.result;
    expect(authOrder).not.toBeNull();

    expect(authOrder.id).not.toBeNull();
    expect(authOrder.purchase_units).not.toBeNull();
    expect(authOrder.purchase_units.length).toBe(1);

    const firstPurchaseUnit = authOrder.purchase_units[0];
    expect(firstPurchaseUnit.reference_id).toBe('default');
    expect(firstPurchaseUnit.amount.currency_code).toBe('USD');
    expect(firstPurchaseUnit.amount.value).toBe('100.00');
    expect(firstPurchaseUnit.payments.authorizations).not.toBeNull();
    expect(firstPurchaseUnit.payments.authorizations[0].links.length).toBe(4);

    expect(authOrder.create_time).not.toBeNull();
    expect(authOrder.links).not.toBeNull();
  });
});
