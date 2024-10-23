import { http, HttpResponse } from 'msw';
import { BASE_URL, WEBHOOK_ID, WEBHOOK_URL } from '../../constant.js';

export const webhookList = () => {
  return http.get(BASE_URL + '/v1/notifications/webhooks', () => {
    return HttpResponse.json({
      webhooks: [
        {
          id: '9PJ03845J3414664L',
          url: 'https://awesome-surf-88174.pktriot.net/notify/payout/success/v1',
          event_types: [
            {
              name: 'PAYMENT.PAYOUTSBATCH.SUCCESS',
              description: 'A batch payout payment completes successfully.',
              status: 'ENABLED',
            },
          ],
          links: [
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/9PJ03845J3414664L',
              rel: 'self',
              method: 'GET',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/9PJ03845J3414664L',
              rel: 'update',
              method: 'PATCH',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/9PJ03845J3414664L',
              rel: 'delete',
              method: 'DELETE',
            },
          ],
        },
        {
          id: '77L022471G5432356',
          url: 'https://en5dkll0y0h6j.x.pipedream.net',
          event_types: [
            {
              name: '*',
              description: 'ALL',
              status: 'ENABLED',
            },
          ],
          links: [
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/77L022471G5432356',
              rel: 'self',
              method: 'GET',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/77L022471G5432356',
              rel: 'update',
              method: 'PATCH',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/77L022471G5432356',
              rel: 'delete',
              method: 'DELETE',
            },
          ],
        },
        {
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
        },
        {
          id: '8DJ74432L1068071G',
          url: 'https://eneb1scptaxaf.x.pipedream.net',
          event_types: [
            {
              name: '*',
              description: 'ALL',
              status: 'ENABLED',
            },
          ],
          links: [
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/8DJ74432L1068071G',
              rel: 'self',
              method: 'GET',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/8DJ74432L1068071G',
              rel: 'update',
              method: 'PATCH',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/8DJ74432L1068071G',
              rel: 'delete',
              method: 'DELETE',
            },
          ],
        },
        {
          id: '54V75616NP725802K',
          url: 'https://engttzg0s98fg.x.pipedream.net',
          event_types: [
            {
              name: '*',
              description: 'ALL',
              status: 'ENABLED',
            },
          ],
          links: [
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/54V75616NP725802K',
              rel: 'self',
              method: 'GET',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/54V75616NP725802K',
              rel: 'update',
              method: 'PATCH',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/54V75616NP725802K',
              rel: 'delete',
              method: 'DELETE',
            },
          ],
        },
        {
          id: '9JS34728PD200013L',
          url: 'https://enio53h0qdhyc.x.pipedream.net',
          event_types: [
            {
              name: '*',
              description: 'ALL',
              status: 'ENABLED',
            },
          ],
          links: [
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/9JS34728PD200013L',
              rel: 'self',
              method: 'GET',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/9JS34728PD200013L',
              rel: 'update',
              method: 'PATCH',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/9JS34728PD200013L',
              rel: 'delete',
              method: 'DELETE',
            },
          ],
        },
        {
          id: '8CD56959CM572202U',
          url: 'https://enioxfwb50hy.x.pipedream.net',
          event_types: [
            {
              name: '*',
              description: 'ALL',
              status: 'ENABLED',
            },
          ],
          links: [
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/8CD56959CM572202U',
              rel: 'self',
              method: 'GET',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/8CD56959CM572202U',
              rel: 'update',
              method: 'PATCH',
            },
            {
              href: 'https://api.sandbox.paypal.com/v1/notifications/webhooks/8CD56959CM572202U',
              rel: 'delete',
              method: 'DELETE',
            },
          ],
        },
      ],
    });
  });
};
