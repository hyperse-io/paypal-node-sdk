import { core } from '@hyperse/paypal-node-sdk';

/**
 * Returns PayPal HTTP client instance with environment which has access
 * credentials context. This can be used invoke PayPal API's provided the
 * credentials have the access to do so.
 */
export function createClient() {
  return new core.PayPalHttpClient(environment());
}

/**
 * Setting up and Returns PayPal SDK environment with PayPal Access credentials.
 * For demo purpose, we are using SandboxEnvironment. In production this will be
 * LiveEnvironment.
 */
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || '<<CLIENT-ID>>';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '<<CLIENT-SECRET>>';

  if (process.env.NODE_ENV === 'production') {
    return new core.LiveEnvironment(clientId, clientSecret);
  }

  return new core.SandboxEnvironment(clientId, clientSecret);
}

export async function prettyPrint(jsonData, pre = '') {
  let pretty = '';
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  for (const key in jsonData) {
    // eslint-disable-next-line no-prototype-builtins
    if (jsonData.hasOwnProperty(key)) {
      if (isNaN(key as any)) pretty += pre + capitalize(key) + ': ';
      else pretty += pre + (parseInt(key) + 1) + ': ';
      if (typeof jsonData[key] === 'object') {
        pretty += '\n';
        pretty += await prettyPrint(jsonData[key], pre + '\t');
      } else {
        pretty += jsonData[key] + '\n';
      }
    }
  }
  return pretty;
}
