import { http, HttpResponse } from 'msw';
import { BASE_URL, WEBHOOK_ID, WEBHOOK_URL } from '../../constant.js';

export const webhookDetail = () => {
  return http.get(BASE_URL + '/v1/notifications/webhooks/' + WEBHOOK_ID, () => {
    return HttpResponse.json({
      id: WEBHOOK_ID,
      url: WEBHOOK_URL,
      event_types: [
        {
          name: '*',
          description: 'ALL',
          status: 'ENABLED',
        },
      ],
      links: [
        {
          href:
            'https://api.sandbox.paypal.com/v1/notifications/webhooks/' +
            WEBHOOK_ID,
          rel: 'self',
          method: 'GET',
        },
        {
          href:
            'https://api.sandbox.paypal.com/v1/notifications/webhooks/' +
            WEBHOOK_ID,
          rel: 'update',
          method: 'PATCH',
        },
        {
          href:
            'https://api.sandbox.paypal.com/v1/notifications/webhooks/' +
            WEBHOOK_ID,
          rel: 'delete',
          method: 'DELETE',
        },
      ],
    });
  });
};
