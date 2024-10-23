import { AuthorizationsVoidRequest } from '../../src/payments/authorizationsVoidRequest.js';
import { AUTHORIZATION_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('Void authorized payment', () => {
  it('authorizes an order', async () => {
    const request = new AuthorizationsVoidRequest(AUTHORIZATION_ID);
    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const authRes = res.result;
    expect(authRes).not.toBeNull();

    expect(authRes.id).not.toBeNull();
    expect(authRes.status).toBe('VOIDED');
    expect(authRes.amount.currency_code).toBe('USD');
    expect(authRes.amount.value).toBe('100.00');

    expect(authRes.create_time).not.toBeNull();
    expect(authRes.links).not.toBeNull();
  });
});
