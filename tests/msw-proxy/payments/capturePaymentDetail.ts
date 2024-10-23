import { http, HttpResponse } from 'msw';
import { BASE_URL, CAPTURE_ID, ORDER_ID } from '../../constant.js';

export const capturePaymentDetail = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);

  return http.get(BASE_URL + '/v2/payments/captures/' + CAPTURE_ID, () => {
    return HttpResponse.json({
      id: CAPTURE_ID,
      amount: {
        currency_code: 'USD',
        value: '100.00',
      },
      final_capture: true,
      seller_protection: {
        status: 'NOT_ELIGIBLE',
      },
      disbursement_mode: 'INSTANT',
      seller_receivable_breakdown: {
        gross_amount: {
          currency_code: 'USD',
          value: '100.00',
        },
        net_amount: {
          currency_code: 'USD',
          value: '100.00',
        },
      },
      status: 'COMPLETED',
      processor_response: {
        avs_code: '',
        cvv_code: 'M',
        response_code: '0000',
      },
      supplementary_data: {
        related_ids: {
          order_id: ORDER_ID,
        },
      },
      payee: {
        email_address: 'john_merchant@example.com',
        merchant_id: 'C7CYMKZDG8D6E',
      },
      create_time: new Date().toISOString(),
      update_time: new Date().toISOString(),
      links: [
        {
          href: `https://api.sandbox.paypal.com/v2/payments/captures/${CAPTURE_ID}`,
          rel: 'self',
          method: 'GET',
        },
        {
          href: `https://api.sandbox.paypal.com/v2/payments/captures/${CAPTURE_ID}/refund`,
          rel: 'refund',
          method: 'POST',
        },
        {
          href: `https://api.sandbox.paypal.com/v2/checkout/orders/${ORDER_ID}`,
          rel: 'up',
          method: 'GET',
        },
      ],
      network_transaction_reference: {
        id: '497874384637468',
        network: 'VISA',
      },
    });
  });
};
