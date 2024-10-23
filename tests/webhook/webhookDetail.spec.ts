import { WebhookDetailRequest } from '../../src/webhook/webhookDetailRequest.js';
import { BASE_URL, WEBHOOK_ID, WEBHOOK_URL } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('create webhook', () => {
  it('create webhook', async () => {
    const request = new WebhookDetailRequest(WEBHOOK_ID);

    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const webhookRes = res.result;
    expect(webhookRes).not.toBeNull();

    expect(webhookRes.id).not.toBeNull();
    expect(webhookRes.url).toBe(WEBHOOK_URL);
    expect(webhookRes.event_types).toEqual([
      {
        name: '*',
        description: 'ALL',
        status: 'ENABLED',
      },
    ]);

    expect(webhookRes.links).not.toBeNull();
    expect(webhookRes.links.length).toBe(3);

    for (const link of webhookRes.links) {
      expect(link.href).toBe(
        BASE_URL + '/v1/notifications/webhooks/' + WEBHOOK_ID
      );
      expect(link.method).not.toBeNull();
    }
  });
});
