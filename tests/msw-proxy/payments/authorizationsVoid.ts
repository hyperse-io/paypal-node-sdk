import { http, HttpResponse } from 'msw';
import { AUTHORIZATION_ID, BASE_URL } from '../../constant.js';

export const authorizeationsVoid = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);

  return http.post(
    BASE_URL + '/v2/payments/authorizations/' + AUTHORIZATION_ID + '/void',
    () => {
      return HttpResponse.json({
        id: AUTHORIZATION_ID,
        status: 'VOIDED',
        amount: {
          currency_code: 'USD',
          value: '100.00',
        },
        seller_protection: {
          status: 'NOT_ELIGIBLE',
        },
        expiration_time: currentDate.toISOString(),
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString(),
        links: [
          {
            href:
              'https://api.sandbox.paypal.com/v2/payments/authorizations/' +
              AUTHORIZATION_ID,
            rel: 'self',
            method: 'GET',
          },
        ],
      });
    }
  );
};
