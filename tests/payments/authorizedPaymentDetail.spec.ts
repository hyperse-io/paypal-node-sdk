import { AuthorizationsGetRequest } from '../../src/payments/authorizationsGetRequest.js';
import { AUTHORIZATION_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('get authorized payment detail', () => {
  it('show details for authorized payment', async () => {
    const request = new AuthorizationsGetRequest(AUTHORIZATION_ID);
    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const paymentDetail = res.result;
    expect(paymentDetail).not.toBeNull();

    expect(paymentDetail.id).not.toBeNull();
    expect(paymentDetail.status).toBe('CREATED');
    expect(paymentDetail.amount.currency_code).toBe('USD');
    expect(paymentDetail.amount.value).toBe('100.00');

    expect(paymentDetail.create_time).not.toBeNull();
    expect(paymentDetail.links).not.toBeNull();
    expect(paymentDetail.links.length).toBe(4);

    expect(paymentDetail.links[0].href).not.toBeNull();
    expect(paymentDetail.links[0].method).toBe('GET');
  });
});
