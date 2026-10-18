import { OrdersGetRequest } from '../../src/orders/ordersGetRequest.js';
import { createClient } from '../test-utils.js';
import { createOrder } from './order-utils.js';

const client = createClient();

describe('OrdersGetRequest', () => {
  it('retrieves an order', async () => {
    const createOrderResponse = await createOrder();

    expect(createOrderResponse.statusCode).toBe(201);

    const getRequest = new OrdersGetRequest(createOrderResponse.result.id);
    const getResponse = await client.execute(getRequest);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.result).not.toBeNull();

    const createdOrder = getResponse.result;
    expect(createdOrder).not.toBeNull();

    expect(createdOrder.id).not.toBeNull();
    expect(createdOrder.purchase_units).not.toBeNull();
    expect(createdOrder.purchase_units.length).toBe(1);

    const firstPurchaseUnit = createdOrder.purchase_units[0];
    expect(firstPurchaseUnit.reference_id).toBe('default');
    expect(firstPurchaseUnit.amount.currency_code).toBe('USD');
    expect(firstPurchaseUnit.amount.value).toBe('100.00');
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
