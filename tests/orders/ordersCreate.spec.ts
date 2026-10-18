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

    const approveLink = createdOrder.links.find(
      (link) => 'approve' === link.rel
    );
    expect(approveLink).toBeDefined();
    expect(approveLink?.href).not.toBeNull();
    expect(approveLink?.method).toBe('GET');
    expect(createdOrder.status).toBe('CREATED');
  });
});
