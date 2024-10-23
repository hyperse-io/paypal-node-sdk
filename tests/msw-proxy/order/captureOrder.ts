import { http, HttpResponse } from 'msw';
import { BASE_URL, CAPTURE_ID, ORDER_ID } from '../../constant.js';

export const captureOrder = () => {
  return http.post(BASE_URL + `/v2/checkout/orders/${ORDER_ID}/capture`, () => {
    const nowISODate = new Date().toISOString();

    return HttpResponse.json({
      id: ORDER_ID,
      intent: 'CAPTURE',
      status: 'COMPLETED',
      payment_source: {
        card: {
          last_digits: '1111',
          expiry: '2035-12',
          brand: 'VISA',
          type: 'UNKNOWN',
          bin_details: {},
        },
      },
      purchase_units: [
        {
          reference_id: 'default',
          amount: {
            currency_code: 'USD',
            value: '100.00',
          },
          payee: {
            email_address: 'john_merchant@example.com',
            merchant_id: 'C7CYMKZDG8D6E',
          },
          soft_descriptor: 'JOHNMERCHAN',
          payments: {
            captures: [
              {
                id: CAPTURE_ID,
                status: 'COMPLETED',
                amount: {
                  currency_code: 'USD',
                  value: '100.00',
                },
                final_capture: true,
                disbursement_mode: 'INSTANT',
                seller_protection: {
                  status: 'NOT_ELIGIBLE',
                },
                seller_receivable_breakdown: {
                  gross_amount: {
                    currency_code: 'USD',
                    value: '100.00',
                  },
                  net_amount: {
                    currency_code: 'USD',
                    value: '100.00',
                  },
                },
                links: [
                  {
                    href: `https://api.sandbox.paypal.com/v2/payments/captures/${CAPTURE_ID}`,
                    rel: 'self',
                    method: 'GET',
                  },
                  {
                    href: `https://api.sandbox.paypal.com/v2/payments/captures/${CAPTURE_ID}/refund`,
                    rel: 'refund',
                    method: 'POST',
                  },
                  {
                    href:
                      'https://api.sandbox.paypal.com/v2/checkout/orders/' +
                      ORDER_ID,
                    rel: 'up',
                    method: 'GET',
                  },
                ],
                create_time: nowISODate,
                update_time: nowISODate,
                network_transaction_reference: {
                  id: '497874384637468',
                  network: 'VISA',
                },
                processor_response: {
                  cvv_code: 'M',
                  response_code: '0000',
                },
              },
            ],
          },
        },
      ],
      create_time: nowISODate,
      update_time: nowISODate,
      links: [
        {
          href: 'https://api.sandbox.paypal.com/v2/checkout/orders/37D52977P9664462C',
          rel: 'self',
          method: 'GET',
        },
      ],
    });
  });
};
