import { http, HttpResponse } from 'msw';
import { AUTHORIZATION_ID, BASE_URL } from '../../constant.js';

export const reauthorizeAuthorizedPayment = () => {
  return http.post(
    BASE_URL +
      '/v2/payments/authorizations/' +
      AUTHORIZATION_ID +
      '/reauthorize',
    () => {
      return HttpResponse.json(
        {
          id: '8AA831015G517922L',
          status: 'CREATED',
          links: [
            {
              rel: 'self',
              method: 'GET',
              href: 'https://api.paypal.com/v2/payments/authorizations/8AA831015G517922L',
            },
            {
              rel: 'capture',
              method: 'POST',
              href: 'https://api.paypal.com/v2/payments/authorizations/8AA831015G517922L/capture',
            },
            {
              rel: 'void',
              method: 'POST',
              href: 'https://api.paypal.com/v2/payments/authorizations/8AA831015G517922L/void',
            },
            {
              rel: 'reauthorize',
              method: 'POST',
              href: 'https://api.paypal.com/v2/payments/authorizations/8AA831015G517922L/reauthorize',
            },
          ],
        },
        { status: 201 }
      );
    }
  );
};
