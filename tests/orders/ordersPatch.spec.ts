import { OrdersGetRequest } from '../../src/orders/ordersGetRequest.js';
import { OrdersPatchRequest } from '../../src/orders/ordersPatchRequest.js';
import { createClient } from '../test-utils.js';
import { createOrder } from './order-utils.js';
const client = createClient();

function buildRequestBody() {
  return [
    {
      op: 'add',
      path: "/purchase_units/@reference_id=='default'/shipping/address",
      value: {
        address_line_1: '123 Townsend St',
        address_line_2: 'Floor 6',
        admin_area_2: 'San Francisco',
        admin_area_1: 'CA',
        postal_code: '94107',
        country_code: 'US',
      },
    },
    {
      op: 'add',
      path: "/purchase_units/@reference_id=='default'/invoice_id",
      value: '03012022-3303-01',
    },
    {
      op: 'replace',
      path: "/purchase_units/@reference_id=='default'/amount",
      value: {
        currency_code: 'USD',
        value: '200.00',
      },
    },
  ];
}

describe('OrdersPatchRequest', () => {
  it('works as expected', async () => {
    const createOrderResponse = await createOrder();
    expect(createOrderResponse.statusCode).toBe(201);

    const patchRequest = new OrdersPatchRequest(createOrderResponse.result.id);
    patchRequest.requestBody(buildRequestBody() as any);
    const patchResponse = await client.execute(patchRequest);
    expect(patchResponse.statusCode).toBe(204);

    const getRequest = new OrdersGetRequest(createOrderResponse.result.id);
    const getResponse = await client.execute(getRequest);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.result).not.toBeNull();

    const createdOrder = getResponse.result;
    expect(createdOrder.id).not.toBeNull();
    expect(createdOrder.purchase_units).not.toBeNull();
    expect(createdOrder.purchase_units.length).toBe(1);

    const firstPurchaseUnit = createdOrder.purchase_units[0];
    expect(firstPurchaseUnit.reference_id).toBe('default');
    expect(firstPurchaseUnit.amount.currency_code).toBe('USD');
    expect(firstPurchaseUnit.amount.value).toBe('200.00');
    expect(firstPurchaseUnit.invoice_id).toBe('03012022-3303-01');
    expect(firstPurchaseUnit.shipping.address).toEqual({
      address_line_1: '123 Townsend St',
      address_line_2: 'Floor 6',
      admin_area_2: 'San Francisco',
      admin_area_1: 'CA',
      postal_code: '94107',
      country_code: 'US',
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
