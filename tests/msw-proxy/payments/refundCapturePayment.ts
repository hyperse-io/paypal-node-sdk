import { http, HttpResponse } from 'msw';
import { BASE_URL, CAPTURE_ID, INVOICE_ID, REFUND_ID } from '../../constant.js';

export const refundCapturePayment = () => {
  const currentDate = new Date().toISOString();

  return http.post(
    BASE_URL + '/v2/payments/captures/' + CAPTURE_ID + '/refund',
    () => {
      return HttpResponse.json(
        {
          id: REFUND_ID,
          amount: {
            currency_code: 'USD',
            value: '10.00',
          },
          note_to_payer: 'Defective product',
          seller_payable_breakdown: {
            gross_amount: {
              currency_code: 'USD',
              value: '10.00',
            },
            paypal_fee: {
              currency_code: 'USD',
              value: '0.00',
            },
            net_amount: {
              currency_code: 'USD',
              value: '10.00',
            },
            total_refunded_amount: {
              currency_code: 'USD',
              value: '10.00',
            },
          },
          invoice_id: INVOICE_ID,
          status: 'COMPLETED',
          create_time: currentDate,
          update_time: currentDate,
          links: [
            {
              href:
                'https://api.sandbox.paypal.com/v2/payments/refunds/' +
                REFUND_ID,
              rel: 'self',
              method: 'GET',
            },
            {
              href:
                'https://api.sandbox.paypal.com/v2/payments/captures/' +
                CAPTURE_ID,
              rel: 'up',
              method: 'GET',
            },
          ],
        },
        { status: 201 }
      );
    }
  );
};
