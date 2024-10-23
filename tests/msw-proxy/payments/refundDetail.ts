import { http, HttpResponse } from 'msw';
import { BASE_URL, INVOICE_ID, REFUND_ID } from '../../constant.js';

export const refundDetail = () => {
  const currentDate = new Date().toISOString();

  return http.get(BASE_URL + '/v2/payments/refunds/' + REFUND_ID, () => {
    return HttpResponse.json({
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
      payer: {
        email_address: 'john_merchant@example.com',
        merchant_id: 'C7CYMKZDG8D6E',
      },
      links: [
        {
          href: 'https://api.sandbox.paypal.com/v2/payments/refunds/8VH8054108162693V',
          rel: 'self',
          method: 'GET',
        },
        {
          href: 'https://api.sandbox.paypal.com/v2/payments/captures/48S68449626833548',
          rel: 'up',
          method: 'GET',
        },
      ],
    });
  });
};
