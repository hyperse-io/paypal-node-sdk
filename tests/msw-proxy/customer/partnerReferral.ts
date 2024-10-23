import { http, HttpResponse } from 'msw';
import { BASE_URL, PARTNER_REFERRAL_ID } from '../../constant.js';

export const partnerReferral = () => {
  return http.post(BASE_URL + '/v2/customer/partner-referrals', async () => {
    return HttpResponse.json(
      {
        links: [
          {
            href:
              'https://api.sandbox.paypal.com/v2/customer/partner-referrals/' +
              PARTNER_REFERRAL_ID,
            rel: 'self',
            method: 'GET',
            description: 'Read Referral Data shared by the Caller.',
          },
          {
            href:
              'https://www.sandbox.paypal.com/bizsignup/partner/entry?referralToken=' +
              PARTNER_REFERRAL_ID,
            rel: 'action_url',
            method: 'GET',
            description:
              'Target WEB REDIRECT URL for the next action. Customer should be redirected to this URL in the browser.',
          },
        ],
      },
      { status: 201 }
    );
  });
};
