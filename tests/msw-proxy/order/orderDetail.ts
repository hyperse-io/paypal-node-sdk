import { http, HttpResponse } from 'msw';
import { BASE_URL, ORDER_ID } from '../../constant.js';
import { db } from '../db.js';

export const orderDetail = () => {
  return http.get(BASE_URL + '/v2/checkout/orders/' + ORDER_ID, () => {
    const orderDetail = db.order.findFirst({
      where: {
        id: {
          equals: ORDER_ID,
        },
      },
    });

    return HttpResponse.json({
      id: '2BS36229R1205824M',
      intent: 'CAPTURE',
      status: 'CREATED',
      purchase_units: [
        {
          reference_id: 'default',
          amount: orderDetail?.purchase_units_amount,
          payee: {
            email_address: 'john_merchant@example.com',
            merchant_id: 'C7CYMKZDG8D6E',
          },
          soft_descriptor: 'JOHNMERCHAN',
          ...orderDetail?.purchase_units_extra,
        },
      ],
      create_time: new Date().toISOString(),
      links: [
        {
          href: 'https://api.sandbox.paypal.com/v2/checkout/orders/' + ORDER_ID,
          rel: 'self',
          method: 'GET',
        },
        {
          href: 'https://www.sandbox.paypal.com/checkoutnow?token=' + ORDER_ID,
          rel: 'approve',
          method: 'GET',
        },
        {
          href: 'https://api.sandbox.paypal.com/v2/checkout/orders/' + ORDER_ID,
          rel: 'update',
          method: 'PATCH',
        },
        {
          href:
            'https://api.sandbox.paypal.com/v2/checkout/orders/' +
            ORDER_ID +
            '/capture',
          rel: 'capture',
          method: 'POST',
        },
      ],
    });
  });
};
