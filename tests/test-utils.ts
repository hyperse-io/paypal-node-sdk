import { config } from 'dotenv';
import { SandboxEnvironment } from 'src/core/PayPalEnvironment.js';
import { PayPalHttpClient } from 'src/core/PayPalHttpClient.js';

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || '<<PAYPAL-CLIENT-ID>>';
  const clientSecret =
    process.env.PAYPAL_CLIENT_SECRET || '<<PAYPAL-CLIENT-SECRET>>';

  return new SandboxEnvironment(clientId, clientSecret);
}

export function createClient() {
  config();
  return new PayPalHttpClient(environment());
}
