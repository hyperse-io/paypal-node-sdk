import { http, HttpResponse } from 'msw';
import { BASE_URL, ORDER_ID } from '../../constant.js';
import { db } from '../db.js';

export const patchOrder = () => {
  return http.patch(BASE_URL + '/v2/checkout/orders/' + ORDER_ID, async () => {
    db.order.update({
      where: {
        id: {
          equals: ORDER_ID,
        },
      },
      data: {
        purchase_units_extra: {
          invoice_id: '03012022-3303-01',
          shipping: {
            address: {
              address_line_1: '123 Townsend St',
              address_line_2: 'Floor 6',
              admin_area_2: 'San Francisco',
              admin_area_1: 'CA',
              postal_code: '94107',
              country_code: 'US',
            },
          },
        },
        purchase_units_amount: {
          value: '200.00',
          currency_code: 'USD',
        },
      },
    });

    return new HttpResponse(null, {
      status: 204,
    });
  });
};
