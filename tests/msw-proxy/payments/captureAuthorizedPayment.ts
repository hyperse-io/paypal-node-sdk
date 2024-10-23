import { http, HttpResponse } from 'msw';
import {
  AUTHORIZATION_ID,
  BASE_URL,
  CAPTURE_ID,
  INVOICE_ID,
} from '../../constant.js';

export const captureAuthorizedPayment = () => {
  const currentDate = new Date().toISOString();

  return http.post(
    BASE_URL + '/v2/payments/authorizations/' + AUTHORIZATION_ID + '/capture',
    () => {
      return HttpResponse.json(
        {
          id: CAPTURE_ID,
          amount: {
            currency_code: 'USD',
            value: '60.00',
          },
          final_capture: true,
          seller_protection: {
            status: 'NOT_ELIGIBLE',
          },
          disbursement_mode: 'INSTANT',
          seller_receivable_breakdown: {
            gross_amount: {
              currency_code: 'USD',
              value: '60.00',
            },
            net_amount: {
              currency_code: 'USD',
              value: '60.00',
            },
          },
          invoice_id: INVOICE_ID,
          status: 'COMPLETED',
          processor_response: {
            avs_code: '',
            cvv_code: 'M',
            response_code: '0000',
          },
          payee: {
            email_address: 'john_merchant@example.com',
            merchant_id: 'C7CYMKZDG8D6E',
          },
          create_time: currentDate,
          update_time: currentDate,
          links: [
            {
              href: 'https://api.sandbox.paypal.com/v2/payments/captures/48S68449626833548',
              rel: 'self',
              method: 'GET',
            },
            {
              href: 'https://api.sandbox.paypal.com/v2/payments/captures/48S68449626833548/refund',
              rel: 'refund',
              method: 'POST',
            },
            {
              href: 'https://api.sandbox.paypal.com/v2/payments/authorizations/1WB67702GT009350H',
              rel: 'up',
              method: 'GET',
            },
          ],
          network_transaction_reference: {
            id: '031808655533130',
            network: 'VISA',
          },
        },
        { status: 201 }
      );
    }
  );
};
