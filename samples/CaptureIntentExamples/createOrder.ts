import { createClient } from 'tests/test-utils.js';
import { orders } from '@hyperse-io/paypal-node-sdk';

/**
 * Setting up the JSON request body for creating the Order. The Intent in the
 * request body should be set as "CAPTURE" for capture intent flow.
 *
 */
function buildRequestBody() {
  return {
    intent: 'CAPTURE',
    application_context: {
      return_url: 'https://www.example.com',
      cancel_url: 'https://www.example.com',
      brand_name: 'EXAMPLE INC',
      locale: 'en-US',
      landing_page: 'BILLING',
      shipping_preference: 'SET_PROVIDED_ADDRESS',
      user_action: 'CONTINUE',
    },
    purchase_units: [
      {
        reference_id: 'PUHF',
        description: 'Sporting Goods',

        custom_id: 'CUST-HighFashions',
        soft_descriptor: 'HighFashions',
        amount: {
          currency_code: 'USD',
          value: '220.00',
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: '180.00',
            },
            shipping: {
              currency_code: 'USD',
              value: '20.00',
            },
            handling: {
              currency_code: 'USD',
              value: '10.00',
            },
            tax_total: {
              currency_code: 'USD',
              value: '20.00',
            },
            shipping_discount: {
              currency_code: 'USD',
              value: '10',
            },
          },
        },
        items: [
          {
            name: 'T-Shirt',
            description: 'Green XL',
            sku: 'sku01',
            unit_amount: {
              currency_code: 'USD',
              value: '90.00',
            },
            tax: {
              currency_code: 'USD',
              value: '10.00',
            },
            quantity: '1',
            category: 'PHYSICAL_GOODS',
          },
          {
            name: 'Shoes',
            description: 'Running, Size 10.5',
            sku: 'sku02',
            unit_amount: {
              currency_code: 'USD',
              value: '45.00',
            },
            tax: {
              currency_code: 'USD',
              value: '5.00',
            },
            quantity: '2',
            category: 'PHYSICAL_GOODS',
          },
        ],
        shipping: {
          method: 'United States Postal Service',
          name: {
            full_name: 'John Doe',
          },
          address: {
            address_line_1: '123 Townsend St',
            address_line_2: 'Floor 6',
            admin_area_2: 'San Francisco',
            admin_area_1: 'CA',
            postal_code: '94107',
            country_code: 'US',
          },
        },
      },
    ],
  };
}

/**
 * This is the sample function which can be sued to create an order. It uses the
 * JSON body returned by buildRequestBody() to create an new Order.
 */
export async function createOrder(debug = false) {
  try {
    const request = new orders.OrdersCreateRequest();
    request.headers['prefer'] = 'return=representation';
    request.requestBody(buildRequestBody() as any);
    const response = await createClient().execute(request);
    if (debug) {
      console.log('Status Code: ' + response.statusCode);
      console.log('Status: ' + response.result.status);
      console.log('Order ID: ' + response.result.id);
      console.log('Intent: ' + response.result.intent);
      console.log('Links: ');
      response.result.links.forEach((item) => {
        const rel = item.rel;
        const href = item.href;
        const method = item.method;
        const message = `\t${rel}: ${href}\tCall Type: ${method}`;
        console.log(message);
      });
      console.log(
        `Gross Amount: ${response.result.purchase_units[0].amount.currency_code} ${response.result.purchase_units[0].amount.value}`
      );
      // To toggle print the whole body comment/uncomment the below line
      console.log(JSON.stringify(response.result, null, 4));
    }
    return response;
  } catch (e) {
    console.log(e);
  }
}
