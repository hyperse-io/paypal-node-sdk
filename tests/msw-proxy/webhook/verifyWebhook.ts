import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../constant.js';

export const VerifyWebhook = () => {
  return http.post(
    BASE_URL + '/v1/notifications/verify-webhook-signature',
    () => {
      return HttpResponse.json({
        verification_status: 'SUCCESS',
      });
    }
  );
};
