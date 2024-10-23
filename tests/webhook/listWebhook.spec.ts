import { WebhookListRequest } from '../../src/webhook/webhookListRequest.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('list webhook', () => {
  it('list webhook', async () => {
    const request = new WebhookListRequest();

    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const webhookRes = res.result?.webhooks;
    expect(webhookRes).not.toBeNull();
    expect(webhookRes.length).toBeGreaterThan(0);
    for (const webhook of webhookRes) {
      expect(webhook.id).not.toBeNull();
      expect(webhook.url).not.toBeNull();
      expect(webhook.event_types).not.toBeNull();

      expect(webhook.links).not.toBeNull();
      expect(webhook.links.length).toBe(3);
    }
  });
});
