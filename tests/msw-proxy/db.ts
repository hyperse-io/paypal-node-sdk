import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  order: {
    id: primaryKey(String),
    purchase_units_amount: {
      currency_code: String,
      value: String,
    },
    payment_source: {
      card_number: String,
      expiry: String,
    },
    purchase_units_extra: {
      invoice_id: String,
      shipping: {
        address: {
          address_line_1: String,
          address_line_2: String,
          admin_area_1: String,
          admin_area_2: String,
          country_code: String,
          postal_code: String,
        },
      },
    },
  },
});
