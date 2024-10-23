import { AuthorizationsReauthorizeRequest } from '../../src/payments/authorizationsReauthorizeRequest.js';
import { AUTHORIZATION_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('Reauthorize authorized payment', () => {
  it('reauthorize authorized payment', async () => {
    const request = new AuthorizationsReauthorizeRequest(AUTHORIZATION_ID);

    request.requestBody({
      amount: {
        value: '10.99',
        currency_code: 'USD',
      },
    });

    const res = await client.execute(request);

    expect(res.statusCode).toBe(201);
    expect(res.result).not.toBeNull();

    const authRes = res.result;
    expect(authRes).not.toBeNull();

    expect(authRes.id).not.toBeNull();
    expect(authRes.status).toBe('CREATED');

    expect(authRes.links).not.toBeNull();
    expect(authRes.links.length).toBe(4);

    expect(authRes.links[0].href).not.toBeNull();
    expect(authRes.links[0].method).toBe('GET');

    expect(authRes.links[3].rel).toBe('reauthorize');
  });
});
