import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constant.js';

export const getToken = () => {
  return http.post(BASE_URL + '/v1/oauth2/token', () => {
    return HttpResponse.json({
      scope:
        'https://uri.paypal.com/services/payments/partnerfee https://uri.paypal.com/services/vault/payment-tokens/read https://uri.paypal.com/services/disputes/read-buyer https://uri.paypal.com/services/payments/realtimepayment https://uri.paypal.com/services/customer/partner-referrals https://uri.paypal.com/services/customer/onboarding/user https://uri.paypal.com/services/payments/referenced-payouts/read https://uri.paypal.com/services/disputes/update-buyer https://uri.paypal.com/services/vault/carrier-accounts/update https://uri.paypal.com/services/wallet/bank-accounts/read https://uri.paypal.com/services/reporting/search/read https://uri.paypal.com/services/wallet/balance-accounts/read https://uri.paypal.com/services/wallet/bank-accounts/internal-read https://uri.paypal.com/services/customer/partner https://uri.paypal.com/services/vault/payment-tokens/readwrite https://uri.paypal.com/services/customer/merchant-integrations/read https://uri.paypal.com/services/customer/verification-tokens/readwrite https://uri.paypal.com/v1/billing-agreements/agreementlist https://uri.paypal.com/services/vault/carrier-accounts/view https://uri.paypal.com/services/applications/webhooks https://uri.paypal.com/services/vault/restricted-elements/read https://uri.paypal.com/services/disputes/update-seller openid https://uri.paypal.com/services/payments/payment/authcapture https://uri.paypal.com/services/billing-agreements/agreements/cancel https://uri.paypal.com/services/identity/grantdelegation https://uri.paypal.com/services/credit/active-merchant-financing-options https://uri.paypal.com/services/billing-agreements https://uri.paypal.com/services/payments/referenced-payouts/readwrite https://uri.paypal.com/services/customer/onboarding/applications https://uri.paypal.com/services/customer/onboarding/account https://uri.paypal.com/payments/payouts https://uri.paypal.com/services/disputes/update-partner https://uri.paypal.com/services/customer/partner-referrals/readwrite https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/checkout/one-click-with-merchant-issued-token https://uri.paypal.com/services/payments/futurepayments https://uri.paypal.com/services/credit/credit-financing-options-low-access https://uri.paypal.com/services/disputes/read-partner https://api.paypal.com/v1/vault/credit-card https://uri.paypal.com/services/apis/batch https://api.paypal.com/v1/payments/.* https://uri.paypal.com/services/payments/referenced-payouts-items/readwrite https://uri.paypal.com/services/wallet/bank-accounts/internal-update https://uri.paypal.com/services/applications/verify-webhook-signature https://uri.paypal.com/services/payments/channelpartner https://api.paypal.com/v1/payments/refund https://uri.paypal.com/services/credit/credit-financing-options https://uri.paypal.com/services/payments/reversepayment Braintree:Vault https://uri.paypal.com/services/disputes/read-seller https://uri.paypal.com/services/payments/referenced-payouts-items/read https://uri.paypal.com/services/payments/refund https://uri.paypal.com/services/risk/raas/transaction-context https://uri.paypal.com/services/disputes/create https://uri.paypal.com/services/customer/consumer-referrals/create https://uri.paypal.com/services/partners/merchant-accounts/readwrite https://uri.paypal.com/services/customer/supporting-documents/readwrite https://uri.paypal.com/services/customer/onboarding/sessions https://api.paypal.com/v1/vault/credit-card/.* https://uri.paypal.com/services/shipping/trackers/readwrite https://uri.paypal.com/services/subscriptions https://uri.paypal.com/services/wallet/bank-accounts/partner-update https://uri.paypal.com/services/wallet/bank-accounts/update',
      access_token:
        'A21AALqRKymmPo_0uDsr_uApqcLIkz_c8nQfZDnDhwtdczpf_EUTlzEGqyXE9Kb5THJny0m26XMq4X-YA9Rjuy-1q2GRJliyw',
      token_type: 'Bearer',
      app_id: 'APP-80W284485P519543T',
      expires_in: 32399,
      supported_authn_schemes: ['email_password', 'remember_me'],
      nonce:
        new Date().toISOString() +
        'mptXCtX_RrMGGBoZXsZuWeAZrZY3iZgMxiwoo_2-nrA',
      client_metadata: {
        name: 'PostmanDefaultApp',
        display_name: 'PostmanDefaultApp',
        logo_uri: '',
        scopes: [
          'https://uri.paypal.com/services/payments/partnerfee',
          'https://uri.paypal.com/services/vault/payment-tokens/read',
          'https://uri.paypal.com/services/payments/basic',
          'https://uri.paypal.com/services/disputes/read-buyer',
          'https://uri.paypal.com/services/payments/realtimepayment',
          'https://uri.paypal.com/services/customer/partner-referrals',
          'https://uri.paypal.com/services/customer/onboarding/user',
          'https://uri.paypal.com/services/payments/referenced-payouts/read',
          'https://uri.paypal.com/services/disputes/update-buyer',
          'https://uri.paypal.com/services/payments/delay-funds-disbursement',
          'https://uri.paypal.com/services/vault/carrier-accounts/update',
          'https://uri.paypal.com/services/wallet/bank-accounts/read',
          'https://uri.paypal.com/services/reporting/search/read',
          'https://uri.paypal.com/services/wallet/balance-accounts/read',
          'https://uri.paypal.com/services/billing-agreements/funding-options-execute',
          'https://uri.paypal.com/services/wallet/bank-accounts/internal-read',
          'https://uri.paypal.com/services/customer/partner',
          'https://uri.paypal.com/services/vault/payment-tokens/readwrite',
          'https://uri.paypal.com/services/customer/merchant-integrations/read',
          'https://uri.paypal.com/services/customer/verification-tokens/readwrite',
          'https://uri.paypal.com/v1/billing-agreements/agreementlist',
          'https://uri.paypal.com/services/vault/carrier-accounts/view',
          'https://uri.paypal.com/services/payments/sweep-funds-external-sink',
          'https://uri.paypal.com/services/applications/webhooks',
          'https://uri.paypal.com/services/vault/restricted-elements/read',
          'https://uri.paypal.com/services/payments/payment/authcapture',
          'https://uri.paypal.com/services/disputes/update-seller',
          'openid',
          'https://uri.paypal.com/services/billing-agreements/agreements/cancel',
          'https://uri.paypal.com/services/identity/grantdelegation',
          'https://uri.paypal.com/services/billing-agreements',
          'https://uri.paypal.com/services/credit/active-merchant-financing-options',
          'https://uri.paypal.com/services/payments/referenced-payouts/readwrite',
          'https://uri.paypal.com/services/customer/onboarding/applications',
          'https://uri.paypal.com/services/customer/onboarding/account',
          'https://uri.paypal.com/payments/payouts',
          'https://uri.paypal.com/services/payments/with-funding-option',
          'https://uri.paypal.com/services/disputes/readwrite',
          'https://uri.paypal.com/services/disputes/update-partner',
          'https://uri.paypal.com/services/customer/partner-referrals/readwrite',
          'https://uri.paypal.com/services/payments/futurepayments',
          'https://uri.paypal.com/services/invoicing',
          'https://uri.paypal.com/services/checkout/one-click-with-merchant-issued-token',
          'https://uri.paypal.com/services/credit/credit-financing-options-low-access',
          'https://uri.paypal.com/services/disputes/read-partner',
          'https://api.paypal.com/v1/vault/credit-card',
          'Braintree:Vault',
          'https://uri.paypal.com/services/apis/batch',
          'https://api.paypal.com/v1/payments/.*',
          'https://uri.paypal.com/services/payments/referenced-payouts-items/readwrite',
          'https://uri.paypal.com/services/wallet/bank-accounts/internal-update',
          'https://uri.paypal.com/services/applications/verify-webhook-signature',
          'https://uri.paypal.com/services/payments/channelpartner',
          'https://api.paypal.com/v1/payments/refund',
          'https://uri.paypal.com/services/disputes/read',
          'https://uri.paypal.com/services/credit/credit-financing-options',
          'https://uri.paypal.com/services/payments/reversepayment',
          'address',
          'https://identity.x.com/xidentity/resources/profile/me',
          'https://uri.paypal.com/services/disputes/read-seller',
          'https://uri.paypal.com/services/payments/referenced-payouts-items/read',
          'https://uri.paypal.com/services/payments/refund',
          'https://uri.paypal.com/services/risk/raas/transaction-context',
          'https://uri.paypal.com/web/experience/incontextxo',
          'https://uri.paypal.com/services/customer/consumer-referrals/create',
          'https://uri.paypal.com/services/disputes/create',
          'https://uri.paypal.com/services/partners/merchant-accounts/readwrite',
          'https://uri.paypal.com/services/customer/supporting-documents/readwrite',
          'https://uri.paypal.com/services/customer/onboarding/sessions',
          'https://api.paypal.com/v1/vault/credit-card/.*',
          'https://uri.paypal.com/services/shipping/trackers/readwrite',
          'https://uri.paypal.com/services/vault/bank-accounts',
          'https://uri.paypal.com/services/subscriptions',
          'https://uri.paypal.com/services/wallet/bank-accounts/partner-update',
          'https://uri.paypal.com/services/wallet/bank-accounts/update',
        ],
        ui_type: 'NEW',
      },
    });
  });
};