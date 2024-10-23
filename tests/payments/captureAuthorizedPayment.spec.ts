import { AuthorizationsCaptureRequest } from '../../src/payments/authorizationsCaptureRequest.js';
import { AUTHORIZATION_ID, INVOICE_ID } from '../constant.js';
import { createClient } from '../test-utils.js';

const client = createClient();

describe('Capture authorized payment', () => {
  it('capture authorized payment', async () => {
    const request = new AuthorizationsCaptureRequest(AUTHORIZATION_ID);

    request.requestBody({
      amount: {
        value: '60',
        currency_code: 'USD',
      },
      invoice_id: INVOICE_ID,
      final_capture: true,
      note_to_payer:
        'If the ordered color is not available, we will substitute with a different color free of charge.',
      soft_descriptor: "Bob's Custom Sweaters",
    });

    const res = await client.execute(request);

    expect(res.statusCode).toBe(201);
    expect(res.result).not.toBeNull();

    const authRes = res.result;
    expect(authRes).not.toBeNull();

    expect(authRes.id).not.toBeNull();
    expect(authRes.status).toBe('COMPLETED');
    expect(authRes.final_capture).toBe(true);
    expect(authRes.amount.currency_code).toBe('USD');
    expect(authRes.amount.value).toBe('60.00');
    expect(authRes.seller_receivable_breakdown?.gross_amount).toEqual(
      authRes.seller_receivable_breakdown?.net_amount
    );

    expect(authRes.create_time).not.toBeNull();
    expect(authRes.links).not.toBeNull();
    expect(authRes.links.length).toBe(3);

    expect(authRes.links[0].href).not.toBeNull();
    expect(authRes.links[0].method).toBe('GET');

    expect(authRes.network_transaction_reference).toEqual({
      id: expect.any(String),
      network: 'VISA',
    });
  });
});
