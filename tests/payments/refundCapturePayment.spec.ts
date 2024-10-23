import { CapturesRefundRequest } from '../../src/payments/capturesRefundRequest.js';
import { CAPTURE_ID, INVOICE_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('Refund captured payment', () => {
  it('authorizes an order', async () => {
    const request = new CapturesRefundRequest(CAPTURE_ID);

    request.requestBody({
      amount: {
        value: '10.00',
        currency_code: 'USD',
      },
      invoice_id: INVOICE_ID,
      note_to_payer: 'Defective product',
    });

    const res = await client.execute(request);

    expect(res.statusCode).toBe(201);
    expect(res.result).not.toBeNull();

    const refundRes = res.result;
    expect(refundRes).not.toBeNull();

    expect(refundRes.id).not.toBeNull();
    expect(refundRes.invoice_id).not.toBeNull();
    expect(refundRes.status).toBe('COMPLETED');
    expect(refundRes.amount.currency_code).toBe('USD');
    expect(refundRes.amount.value).toBe('10.00');

    expect(refundRes.create_time).not.toBeNull();
    expect(refundRes.links).not.toBeNull();
    expect(refundRes.links.length).toBe(2);

    expect(refundRes.links[0].href).not.toBeNull();
    expect(refundRes.links[0].method).toBe('GET');
  });
});
