import { http, HttpResponse } from 'msw';
import { BASE_URL, ORDER_ID } from '../../constant.js';
import { db } from '../db.js';

export const createOrder = () => {
  return http.post(BASE_URL + '/v2/checkout/orders', async ({ request }) => {
    const reqBody = (await request.json()) as any;
    const { purchase_units } = reqBody;
    const amount = purchase_units?.[0]?.amount;

    db.order.create({
      id: ORDER_ID,
      purchase_units_amount: amount,
    });

    return HttpResponse.json(
      {
        id: ORDER_ID,
        intent: 'CAPTURE',
        status: 'CREATED',
        purchase_units: [
          {
            reference_id: 'default',
            amount: amount,
            payee: {
              email_address: 'john_merchant@example.com',
              merchant_id: 'C7CYMKZDG8D6E',
            },
          },
        ],
        create_time: new Date().toISOString(),
        links: [
          {
            href: `https://api.sandbox.paypal.com/v2/checkout/orders/${ORDER_ID}`,
            rel: 'self',
            method: 'GET',
          },
          {
            href: `https://www.sandbox.paypal.com/checkoutnow?token=${ORDER_ID}`,
            rel: 'approve',
            method: 'GET',
          },
          {
            href: `https://api.sandbox.paypal.com/v2/checkout/orders/${ORDER_ID}`,
            rel: 'update',
            method: 'PATCH',
          },
          {
            href: `https://api.sandbox.paypal.com/v2/checkout/orders/${ORDER_ID}/capture`,
            rel: 'capture',
            method: 'POST',
          },
        ],
      },
      { status: 201 }
    );
  });
};
