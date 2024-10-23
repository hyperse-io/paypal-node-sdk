import { WebhookDeleteRequest } from '../../src/webhook/webhookDeleteRequest.js';
import { WEBHOOK_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('delete webhook', () => {
  it('delete webhook', async () => {
    const request = new WebhookDeleteRequest(WEBHOOK_ID);

    const res = await client.execute(request);

    expect(res.statusCode).toBe(204);
  });
});
