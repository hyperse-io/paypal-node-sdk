import { RefundsGetRequest } from '../../src/payments/refundsGetRequest.js';
import { REFUND_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('refund detail', () => {
  it('show refund details', async () => {
    const request = new RefundsGetRequest(REFUND_ID);
    const res = await client.execute(request);

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toBeNull();

    const refundRes = res.result;
    expect(refundRes).not.toBeNull();

    expect(refundRes.id).not.toBeNull();
    expect(refundRes.status).toBe('COMPLETED');
    expect(refundRes.amount.currency_code).toBe('USD');
    expect(refundRes.amount.value).toBe('10.00');

    expect(refundRes.seller_payable_breakdown?.total_refunded_amount).toEqual({
      currency_code: 'USD',
      value: '10.00',
    });

    expect(refundRes.create_time).not.toBeNull();
    expect(refundRes.links).not.toBeNull();
    expect(refundRes.links.length).toBe(2);
  });
});
