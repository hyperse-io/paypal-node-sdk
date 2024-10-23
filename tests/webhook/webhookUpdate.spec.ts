import { WebhookUpdateRequest } from '../../src/webhook/webhookUpdateRequest.js';
import { BASE_URL, WEBHOOK_ID, WEBHOOK_URL } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('update webhook', () => {
  it('update webhook', async () => {
    const request = new WebhookUpdateRequest(WEBHOOK_ID);

    request.requestBody({
      op: 'replace',
      path: '/event_types',
      value: [
        {
          name: 'CUSTOMER.DISPUTE.CREATED',
        },
        {
          name: 'CATALOG.PRODUCT.CREATED',
        },
      ],
    });

    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const webhookRes = res.result;

    expect(webhookRes.id).not.toBeNull();
    expect(webhookRes.url).toBe(WEBHOOK_URL);
    expect(webhookRes.event_types).toEqual([
      {
        name: 'CUSTOMER.DISPUTE.CREATED',
        description: 'A customer dispute is created.',
      },
      {
        name: 'CATALOG.PRODUCT.CREATED',
        description: 'Product created',
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
