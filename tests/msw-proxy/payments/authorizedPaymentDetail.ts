import { http, HttpResponse } from 'msw';
import { AUTHORIZATION_ID, BASE_URL, ORDER_ID } from '../../constant.js';

export const authorizedPaymentDetail = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);

  return http.get(
    BASE_URL + '/v2/payments/authorizations/' + AUTHORIZATION_ID,
    () => {
      return HttpResponse.json({
        id: AUTHORIZATION_ID,
        status: 'CREATED',
        amount: {
          currency_code: 'USD',
          value: '100.00',
        },
        seller_protection: {
          status: 'NOT_ELIGIBLE',
        },
        processor_response: {
          avs_code: '',
          cvv_code: 'M',
          response_code: '0000',
        },
        supplementary_data: {
          related_ids: {
            order_id: ORDER_ID,
          },
        },
        payee: {
          email_address: 'john_merchant@example.com',
          merchant_id: 'C7CYMKZDG8D6E',
        },
        expiration_time: currentDate.toISOString(),
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString(),
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
              'https://api.sandbox.paypal.com/v2/checkout/orders/' + ORDER_ID,
            rel: 'up',
            method: 'GET',
          },
        ],
        network_transaction_reference: {
          id: '562532237663607',
          network: 'VISA',
        },
      });
    }
  );
};
