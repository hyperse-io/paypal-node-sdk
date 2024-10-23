import { createOrder } from './order-utils.js';

describe('OrdersCreateRequest', () => {
  it('creates an order', async () => {
    const createResponse = await createOrder();
    const createdOrder = createResponse.result;

    expect(createResponse.statusCode).toBe(201);
    expect(createdOrder).not.toBeNull();

    expect(createdOrder.id).not.toBeNull();
    expect(createdOrder.purchase_units).not.toBeNull();
    expect(createdOrder.purchase_units.length).toBe(1);

    const firstPurchaseUnit = createdOrder.purchase_units[0];
    expect(firstPurchaseUnit.reference_id).toBe('default');
    expect(firstPurchaseUnit.amount).toEqual({
      currency_code: 'USD',
      value: '100.00',
    });

    expect(createdOrder.create_time).not.toBeNull();
    expect(createdOrder.links).not.toBeNull();

    let foundApproveURL = false;
    for (const link of createdOrder.links) {
      if ('approve' === link.rel) {
        foundApproveURL = true;
        expect(link.href).not.toBeNull();
        expect(link.method).toBe('GET');
      }
    }
    expect(foundApproveURL).toBe(true);
    expect(createdOrder.status).toBe('CREATED');
  });
});
