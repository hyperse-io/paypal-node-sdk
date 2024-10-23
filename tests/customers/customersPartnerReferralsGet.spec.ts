import { CustomersPartnerReferralsGetRequest } from '../../src/customers/customersPartnerReferralsGetRequest.js';
import { PARTNER_REFERRAL_ID } from '../constant.js';
import { createClient } from '../test-utils.js';
const client = createClient();

function generateCustomersPartnerReferralsGet() {
  const request = new CustomersPartnerReferralsGetRequest(PARTNER_REFERRAL_ID);
  return client.execute(request);
}

describe('CustomersPartnerReferralsRequestGet', () => {
  it('Show referral data', async () => {
    const generateResponse = await generateCustomersPartnerReferralsGet();
    const customersPartnerReferrals = generateResponse.result;
    expect(generateResponse.statusCode).toBe(200);
    expect(customersPartnerReferrals).not.toBeNull();

    expect(Array.isArray(customersPartnerReferrals.links)).toBe(true);
    expect(customersPartnerReferrals.links).not.toBeNull();
    expect(customersPartnerReferrals.links.length).toBe(2);

    const firstPartnerReferralsLink = customersPartnerReferrals.links[0];

    expect(firstPartnerReferralsLink.href).not.toBeNull();
    expect(firstPartnerReferralsLink.rel).toBe('self');
    expect(firstPartnerReferralsLink.method).toBe('GET');
    expect(firstPartnerReferralsLink.description).not.toBeNull();

    expect(customersPartnerReferrals.submitter_payer_id).not.toBeNull();
    expect(customersPartnerReferrals.referral_data).not.toBeNull();
  });
});
