import { type BaseHeaders } from '../core/HttpRequestBase.js';

export interface BaseOrderHeaders extends BaseHeaders {
  'Content-Type': 'application/json';
}

export type TokenType = 'BILLING_AGREEMENT';

// https://developer.paypal.com/docs/api/payments/v2/#definition-token
export interface Token {
  id: string;
  type: TokenType;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-payment_source
export interface PaymentSource {
  token: Token;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-checkout_payment_intent
export type CheckoutPaymentIntent = 'CAPTURE' | 'AUTHORIZE';

// https://developer.paypal.com/docs/api/orders/v2/#definition-payer_base
export interface PayerBase {
  email_address: string;
  payer_id: string;
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-name
export interface Name {
  alternate_full_name: string;
  full_name: string;
  given_name: string;
  middle_name: string;
  prefix: string;
  suffix: string;
  surname: string;
}

export type PhoneType = 'FAX' | 'HOME' | 'MOBILE' | 'OTHER' | 'PAGER' | 'WORK';

// https://developer.paypal.com/docs/api/orders/v2/#definition-phone_with_type
export interface PhoneWithType {
  phone_type?: PhoneType;
  phone_number: {
    national_number: string;
  };
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-payer
export interface Payer extends PayerBase {
  address: AddressPortable;
  birth_date: string;
  name: Name;
  phone: PhoneWithType;
  tax_info: TaxInfo;
}

export type TaxIdType = 'BR_CNPJ' | 'BR_CPF';

// https://developer.paypal.com/docs/api/payments/v2/#definition-tax_info
export interface TaxInfo {
  tax_id_type: TaxIdType;
  tax_id: string;
}
// https://developer.paypal.com/docs/api/payments/v2/#definition-address_details
export interface AddressDetails {
  building_name: string;
  delivery_service: string;
  street_name: string;
  street_number: string;
  street_type: string;
  sub_building: string;
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-address_portable
export interface AddressPortable {
  address_details?: AddressDetails;
  address_line_1?: string;
  address_line_2?: string;
  address_line_3?: string;
  admin_area_1?: string;
  admin_area_2?: string;
  admin_area_3?: string;
  admin_area_4?: string;
  country_code: string;
  postal_code?: string;
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-money
export interface Money {
  currency_code: string;
  value: string;
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-amount_breakdown
export interface AmountBreakdown {
  discount: Money;
  handling: Money;
  insurance: Money;
  item_total: Money;
  shipping_discount: Money;
  shipping: Money;
  tax_total: Money;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-amount_with_breakdown
export interface AmountWithBreakdown {
  breakdown?: AmountBreakdown;
  currency_code: string;
  value: string;
}

export type Category = 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION';

// https://developer.paypal.com/docs/api/orders/v2/#definition-item
export interface Item {
  name: string;
  unit_amount: Money;
  tax?: Money;
  quantity: string;
  description?: string;
  sku?: string;
  category: Category;
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-payee
export interface Payee {
  email_address?: string;
  merchant_id?: string;
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-disbursement_mode
export type DisbursementMode = 'DELAYED' | 'INSTANT';

// https://developer.paypal.com/docs/api/payments/v2/#definition-payee_base
export type PayeeBase = Payee;

// https://developer.paypal.com/docs/api/payments/v2/#definition-platform_fee
export interface PlatformFee {
  amount: Money;
  payee?: PayeeBase;
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-payment_instruction
export interface PaymentInstruction {
  disbursement_mode: DisbursementMode;
  payee_pricing_tier_id: string;
  platform_fees: PlatformFee[];
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-shipping_type
export type ShippingType = 'PICKUP' | 'PICKUP_IN_PERSON' | 'SHIPPING';

// https://developer.paypal.com/docs/api/orders/v2/#definition-shipping_detail
export interface ShippingDetail {
  address: {
    address_line_1?: string;
    address_line_2?: string;
    admin_area_1?: string;
    admin_area_2?: string;
    country_code: string;
    postal_code?: string;
  };
  name?: {
    full_name?: string;
  };
  type?: ShippingType;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-purchase_unit_request
export interface PurchaseUnitRequest {
  amount: AmountWithBreakdown;
  custom_id?: string;
  description?: string;
  invoice_id?: string;
  items?: Item[];
  payee?: Payee;
  payment_instruction?: PaymentInstruction;
  reference_id?: string;
  shipping?: ShippingDetail;
  soft_descriptor?: string;
}

export type LandingPage = 'LOGIN' | 'BILLING' | 'NO_PREFERENCE';

export type ShippingPreference =
  | 'GET_FROM_FILE'
  | 'NO_SHIPPING'
  | 'SET_PROVIDED_ADDRESS';

export type UserAction = 'CONTINUE' | 'PAY_NOW';

export type PayeePreferred = 'IMMEDIATE_PAYMENT_REQUIRED' | 'UNRESTRICTED';

export type StandardEntryClassCode = 'CCD' | 'PPD' | 'TEL' | 'WEB';

// https://developer.paypal.com/docs/api/orders/v2/#definition-payment_method
export interface PaymentMethod {
  payee_preferred: PayeePreferred;
  payer_selected: string;
  standard_entry_class_code: StandardEntryClassCode;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-payment_initiator
export type PaymentInitiator = 'CUSTOMER' | 'MERCHANT';

export type PaymentType = 'ONE_TIME' | 'RECURRING' | 'UNSCHEDULED';

export type Usage = 'DERIVED' | 'FIRST' | 'SUBSEQUENT';

// https://developer.paypal.com/docs/api/orders/v2/#definition-stored_payment_source
export interface StoredPaymentSource {
  payment_initiator: PaymentInitiator;
  payment_type: PaymentType;
  usage?: Usage;
  previous_network_transaction_reference?: object;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
export interface OrderApplicationContext {
  brand_name?: string;
  locale?: string;
  landing_page?: LandingPage;
  shipping_preference?: ShippingPreference;
  user_action?: UserAction;
  payment_method?: PaymentMethod;
  return_url?: string;
  cancel_url?: string;
  stored_payment_source?: StoredPaymentSource;
}

export type Operation = 'add' | 'copy' | 'move' | 'remove' | 'replace' | 'test';

// https://developer.paypal.com/docs/api/orders/v2/#definition-patch
export interface Patch {
  from: string;
  op: Operation;
  path: string;
  value: any;
}
