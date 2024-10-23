import { VerifyWebhookSignature } from '../../src/webhook/verifyWebhookSignature.js';
import { WEBHOOK_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('verify webhook', () => {
  it('verify webhook', async () => {
    const request = new VerifyWebhookSignature();

    request.requestBody({
      webhook_id: WEBHOOK_ID,
      transmission_id: '69cd13f0-d67a-11e5-baa3-778b53f4ae55',
      transmission_time: new Date().toISOString(),
      cert_url: 'cert_url',
      auth_algo: 'SHA256withRSA',
      transmission_sig:
        'lmI95Jx3Y9nhR5SJWlHVIWpg4AgFk7n9bCHSRxbrd8A9zrhdu2rMyFrmz',
      webhook_event: {
        id: '8PT597110X687430LKGECATA',
        create_time: '2013-06-25T21:41:28Z',
        resource_type: 'authorization',
        event_version: '1.0',
        event_type: 'PAYMENT.AUTHORIZATION.CREATED',
        summary: 'A payment authorization was created',
        resource_version: '1.0',
      },
    });

    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const webhookRes = res.result;

    expect(webhookRes.verification_status).toBe('SUCCESS');
  });
});
