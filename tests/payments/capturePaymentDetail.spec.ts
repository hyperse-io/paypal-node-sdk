import { CapturesGetRequest } from '../../src/payments/capturesGetRequest.js';
import { CAPTURE_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('get capture payment detail', () => {
  it('show details for capture payment', async () => {
    const request = new CapturesGetRequest(CAPTURE_ID);

    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const paymentDetail = res.result;
    expect(paymentDetail).not.toBeNull();

    expect(paymentDetail.id).not.toBeNull();
    expect(paymentDetail.status).toBe('COMPLETED');
    expect(paymentDetail.final_capture).toBe(true);
    expect(paymentDetail.amount.currency_code).toBe('USD');
    expect(paymentDetail.amount.value).toBe('100.00');

    expect(paymentDetail.seller_receivable_breakdown?.gross_amount).toEqual(
      paymentDetail.seller_receivable_breakdown?.net_amount
    );

    expect(paymentDetail.create_time).not.toBeNull();
    expect(paymentDetail.links).not.toBeNull();
    expect(paymentDetail.links.length).toBe(3);

    expect(paymentDetail.links[0].href).not.toBeNull();
    expect(paymentDetail.links[0].method).toBe('GET');

    expect(
      paymentDetail.network_transaction_reference?.acquirer_reference_number
    ).not.toBeNull();
  });
});
