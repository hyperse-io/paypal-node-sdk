import { http, HttpResponse } from 'msw';
import { BASE_URL, WEBHOOK_ID } from '../../constant.js';

export const deleteWebhook = () => {
  return http.delete(
    BASE_URL + '/v1/notifications/webhooks/' + WEBHOOK_ID,
    async () => {
      return new HttpResponse(null, {
        status: 204,
      });
    }
  );
};
