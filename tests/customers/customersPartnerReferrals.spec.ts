import { CustomersPartnerReferralsRequest } from '../../src/customers/customersPartnerReferralsRequest.js';
import { createClient } from '../test-utils.js';

const client = createClient();

function buildRequestBody() {
  return {
    email: 'accountemail@example.com',
    tracking_id: 'testenterprices123122',
    partner_config_override: {
      return_url: 'https://testenterprises.com/merchantonboarded',
      return_url_description:
        'the url to return the merchant after the paypal onboarding process.',
      show_add_credit_card: true,
    },
    operations: [
      {
        operation: 'API_INTEGRATION',
        api_integration_preference: {
          rest_api_integration: {
            integration_method: 'PAYPAL',
            integration_type: 'THIRD_PARTY',
            third_party_details: {
              features: ['PAYMENT', 'REFUND', 'PARTNER_FEE'],
            },
          },
        },
      },
    ],
    products: ['PAYMENT_METHODS'],
    capabilities: ['APPLE_PAY'],
    legal_consents: [
      {
        type: 'SHARE_DATA_CONSENT',
        granted: true,
      },
    ],
  };
}

function generateCustomersPartnerReferrals() {
  const request = new CustomersPartnerReferralsRequest();
  request.requestBody(buildRequestBody());
  return client.execute(request);
}

describe('CustomersPartnerReferralsRequest', () => {
  it('generate an partner referals', async () => {
    const generateResponse = await generateCustomersPartnerReferrals();
    const customersPartnerReferrals = generateResponse.result;
    expect(generateResponse.statusCode).toBe(201);
    expect(customersPartnerReferrals).not.toBeNull();

    expect(Array.isArray(customersPartnerReferrals.links)).toBe(true);
    expect(customersPartnerReferrals.links).not.toBeNull();
    expect(customersPartnerReferrals.links.length).toBe(2);

    const firstPartnerReferralsLink = customersPartnerReferrals.links[0];

    expect(firstPartnerReferralsLink.href).not.toBeNull();
    expect(firstPartnerReferralsLink.rel).toBe('self');
    expect(firstPartnerReferralsLink.method).toBe('GET');
    expect(firstPartnerReferralsLink.description).not.toBeNull();

    let actionURL = false;
    for (const link of customersPartnerReferrals.links) {
      if ('action_url' === link.rel) {
        actionURL = true;
        expect(link.href).not.toBeNull();
        expect(link.method).toBe('GET');
      }
    }
    chai.assert.isTrue(actionURL);
  });
});
