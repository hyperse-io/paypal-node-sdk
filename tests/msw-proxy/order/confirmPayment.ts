import { http, HttpResponse } from 'msw';
import { BASE_URL, ORDER_ID } from '../../constant.js';
import { db } from '../db.js';

export const confirmPayment = () => {
  return http.post(
    BASE_URL + `/v2/checkout/orders/${ORDER_ID}/confirm-payment-source`,
    ({ request }) => {
      const { payment_source } = request.body as any;

      const orderDetail = db.order.findFirst({
        where: {
          id: {
            equals: ORDER_ID,
          },
        },
      });

      db.order.update({
        where: {
          id: {
            equals: ORDER_ID,
          },
        },
        data: {
          payment_source: {
            card_number: payment_source?.card?.number,
            expiry: payment_source?.card?.expiry,
          },
        },
      });

      return HttpResponse.json({
        id: ORDER_ID,
        intent: 'CAPTURE',
        status: 'APPROVED',
        payment_source: {
          card: {
            last_digits: payment_source?.card?.number?.slice(-4),
            expiry: payment_source?.card?.expiry,
            brand: 'VISA',
            type: 'UNKNOWN',
            bin_details: {},
          },
        },
        purchase_units: [
          {
            reference_id: 'default',
            amount: orderDetail?.purchase_units_amount,
            payee: {
              email_address: 'john_merchant@example.com',
              merchant_id: 'C7CYMKZDG8D6E',
            },
            soft_descriptor: 'JOHNMERCHAN',
          },
        ],
        links: [
          {
            href: `https://api.sandbox.paypal.com/v2/checkout/orders/${ORDER_ID}`,
            rel: 'self',
            method: 'GET',
          },
          {
            href: `https://api.sandbox.paypal.com/v2/checkout/orders/${ORDER_ID}/capture`,
            rel: 'capture',
            method: 'POST',
          },
        ],
      });
    }
  );
};
