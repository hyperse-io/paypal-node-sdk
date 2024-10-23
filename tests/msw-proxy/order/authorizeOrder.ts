import { http, HttpResponse } from 'msw';
import { AUTHORIZATION_ID, BASE_URL, ORDER_ID } from '../../constant.js';

export const authorizeOrder = () => {
  return http.post(
    BASE_URL + '/v2/checkout/orders/' + ORDER_ID + '/authorize',
    () => {
      return HttpResponse.json({
        id: ORDER_ID,
        intent: 'AUTHORIZE',
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
              authorizations: [
                {
                  status: 'CREATED',
                  id: AUTHORIZATION_ID,
                  amount: {
                    currency_code: 'USD',
                    value: '100.00',
                  },
                  seller_protection: {
                    status: 'NOT_ELIGIBLE',
                  },
                  processor_response: {
                    cvv_code: 'M',
                    response_code: '0000',
                  },
                  expiration_time: new Date().toISOString(),
                  links: [
                    {
                      href: `https://api.sandbox.paypal.com/v2/payments/authorizations/${AUTHORIZATION_ID}`,
                      rel: 'self',
                      method: 'GET',
                    },
                    {
                      href: `https://api.sandbox.paypal.com/v2/payments/authorizations/${AUTHORIZATION_ID}/capture`,
                      rel: 'capture',
                      method: 'POST',
                    },
                    {
                      href: `https://api.sandbox.paypal.com/v2/payments/authorizations/${AUTHORIZATION_ID}/void`,
                      rel: 'void',
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
                  create_time: new Date().toISOString(),
                  update_time: new Date().toISOString(),
                  network_transaction_reference: {
                    id: '562532237663607',
                    network: 'VISA',
                  },
                },
              ],
            },
          },
        ],
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString(),
        links: [
          {
            href:
              'https://api.sandbox.paypal.com/v2/checkout/orders/' + ORDER_ID,
            rel: 'self',
            method: 'GET',
          },
        ],
      });
    }
  );
};
