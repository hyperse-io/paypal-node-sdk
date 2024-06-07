/**
 * Docs: https://developer.paypal.com/docs/api/orders/v2/
 */

import { type BaseHeaders } from '../core/HttpRequestBase.js';
import {
  type ActivityTimestamps,
  type AddressDetails,
  type AddressPortable,
  type AmountBreakdown,
  type Capture,
  type CardBrand,
  type CardType,
  type LinkDescription,
  type Money,
  type Name,
  type Payee,
  type PaymentInstruction,
  type Phone,
  type ProcessorResponse,
  type Refund,
  type ShippingType,
  type Status,
  type TaxInfo,
  type Token,
} from './type-payment.js';

// https://developer.paypal.com/docs/api/orders/v2/#definition-account_tier
export type AccountTier = 'BUSINESS' | 'PERSONAL' | 'PREMIER';

// https://developer.paypal.com/docs/api/orders/v2/#definition-ach_debit_response
export interface AchDebitResponse {
  account_holder_name: string;
  last_digits: string;
  routing_number: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-address_name
export interface AddressName {
  address_details?: AddressDetails;
  address_line_1?: string;
  address_line_2?: string;
  address_line_3?: string;
  addressee?: string;
  admin_area_1?: string;
  admin_area_2?: string;
  admin_area_3?: string;
  admin_area_4?: string;
  country_code: string;
  postal_code?: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-amount_with_breakdown
export interface AmountWithBreakdown {
  breakdown?: AmountBreakdown;
  currency_code: string;
  value: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-authentication_response
export interface AuthenticationResponse {
  liability_shift: LiabilityShift;
  three_d_secure: ThreeDSecureAuthenticationResponse;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-three_d_secure_authentication_response
export interface ThreeDSecureAuthenticationResponse {
  authentication_status: AuthenticationStatus;
  enrollment_status: EnrollmentStatus;
}

export type AuthenticationStatus =
  | 'Y'
  | 'N'
  | 'U'
  | 'A'
  | 'C'
  | 'R'
  | 'D'
  | 'I';

export type EnrollmentStatus = 'Y' | 'N' | 'U' | 'B';

export type LiabilityShift = 'NO' | 'POSSIBLE' | 'UNKNOWN' | 'YES';

// https://developer.paypal.com/docs/api/orders/v2/#definition-business_name
export interface BusinessName {
  business_name: string;
  orthography: Orthography;
}

export type Orthography =
  | 'Arab'
  | 'Armn'
  | 'Beng'
  | 'Cans'
  | 'Cyrl'
  | 'Deva'
  | 'Ethi'
  | 'Geor'
  | 'Grek'
  | 'Gujr'
  | 'Guru'
  | 'Hani'
  | 'Hebr'
  | 'Java'
  | 'Jpan'
  | 'Kana'
  | 'Khmr'
  | 'Knda'
  | 'Kore'
  | 'Laoo'
  | 'Latn'
  | 'Mlym'
  | 'Mong'
  | 'Mymr'
  | 'Orya'
  | 'Sinh'
  | 'Sund'
  | 'Syrc'
  | 'Taml'
  | 'Telu'
  | 'Thaa'
  | 'Thai'
  | 'Tibt'
  | 'Yiii'
  | 'Zyyy'
  | 'Zzzz';

// https://developer.paypal.com/docs/api/orders/v2/#definition-business_type
export type business_type =
  | 'ANY_OTHER_BUSINESS_ENTITY'
  | 'ASSOCIATION'
  | 'CORPORATION'
  | 'GENERAL_PARTNERSHIP'
  | 'GOVERNMENT'
  | 'INDIVIDUAL'
  | 'LIMITED_LIABILITY_PARTNERSHIP'
  | 'LIMITED_LIABILITY_PRIVATE_CORPORATION'
  | 'LIMITED_LIABILITY_PROPRIETORS'
  | 'LIMITED_PARTNERSHIP'
  | 'LIMITED_PARTNERSHIP_PRIVATE_CORPORATION'
  | 'NONPROFIT'
  | 'ONLY_BUY_OR_SEND_MONEY'
  | 'OTHER_CORPORATE_BODY'
  | 'PARTNERSHIP'
  | 'PRIVATE_CORPORATION'
  | 'PRIVATE_PARTNERSHIP'
  | 'PROPRIETORSHIP'
  | 'PROPRIETORSHIP_CRAFTSMAN'
  | 'PROPRIETORY_COMPANY'
  | 'PUBLIC_COMPANY'
  | 'PUBLIC_CORPORATION'
  | 'PUBLIC_PARTNERSHIP'
  | 'REGISTERED_COOPERATIVE';

// https://developer.paypal.com/docs/api/orders/v2/#definition-card_response
export interface CardResponse {
  billing_address: {
    address_line_1?: string;
    address_line_2?: string;
    admin_area_1?: string;
    admin_area_2?: string;
    country_code: string;
    postal_code?: string;
  };
  authentication_result: AuthenticationResponse;
  brand: CardBrand;
  last_digits: string;
  name: string;
  type: CardType;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-checkout_payment_intent
export type CheckoutPaymentIntent = 'CAPTURE' | 'AUTHORIZE';

// https://developer.paypal.com/docs/api/orders/v2/#definition-confirm_order_request
export interface ConfirmOrderRequest {
  application_context?: OrderConfirmApplicationContext;
  payment_source: PaymentSource;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-order_confirm_application_context
export interface OrderConfirmApplicationContext {
  brand_name: string;
  cancel_url: string;
  locale: string;
  return_url: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-payment_source
export interface PaymentSource {
  token: Token;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-contingency
export type Contingency = '3D_SECURE';

// https://developer.paypal.com/docs/api/orders/v2/#definition-document_issuer
export interface DocumentIssuer {
  authority?: string;
  country_code: string;
  province_code?: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-enrolled
export type Enrolled = 'B' | 'N' | 'U' | 'Y';

// https://developer.paypal.com/docs/api/orders/v2/#definition-identity_document
export interface IdentityDocument {
  type: IdentityDocumentType;
  issuer: DocumentIssuer;
  id_number: string;
  issued_date: string;
  expiration_date: string;
}

export type IdentityDocumentType =
  | 'INDIVIDUAL_TAXPAYER_IDENTIFICATION_NUMBER'
  | 'NATIONAL_IDENTIFICATION_NUMBER'
  | 'PASSPORT_NUMBER'
  | 'SOCIAL_SECURITY_NUMBER'
  | 'SSN4'
  | 'TAX_IDENTIFICATION_NUMBER';

// https://developer.paypal.com/docs/api/orders/v2/#definition-issuer
export type Issuer = 'CARD_ISSUER_INSTALLMENTS' | 'PAYPAL';

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-account
export interface ModelAccount {
  account_id: string;
  account_number: string;
  account_tags: string[];
  legal_country_code: string;
  legal_entity: string;
  pricing_category: string;
  registration_type: string;
  status: Status;
  tier: Tier;
  time_created: string;
}

export type Tier = 'BUSINESS' | 'PERSONAL' | 'PREMIER';

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-address_with_confirmation
export interface ModelAddressWithConfirmation {
  confirmation_authority: string;
  confirmation_status: string;
  id: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-auth_tolerance
export interface ModelAuthTolerance {
  absolute: Money;
  percent: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-authorization_directives
export interface ModelAuthorizationDirectives {
  allow_multiple_captures: boolean;
  expiry_time_offset: number;
  honor_time_offset: number;
  tolerance: ModelAuthTolerance;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-business
export interface ModelBusiness extends ActivityTimestamps {
  addresses: ModelAddressWithConfirmation[];
  category: ModelBusinessCategory;
  customer_service_contactsobject: ModelCustomerServiceContact;
  description: string;
  emails: string[];
  external_id: string;
  id: string;
  identifications: ModelBusinessIdentification;
  names: BusinessName[];
  owners: ModelPerson[];
  phones: ModelPhoneInfo[];
  primary_email: string;
  primary: boolean;
  type: 'INDIVIDUAL' | 'PROPRIETORSHIP' | 'PARTNERSHIP';
  url: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-business_category
export interface ModelBusinessCategory {
  category: string;
  mcc_code: string;
  sub_category: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-business_identification
export interface ModelBusinessIdentification {
  identifier: string;
  issued_time: string;
  issuer: DocumentIssuer;
  type: 'TAX_IDENTIFICATION_NUMBER' | 'BUSINESS_REGISTRATION_NUMBER';
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-customer_service_contact
export interface ModelCustomerServiceContact {
  emails: string[];
  phones: ModelPhoneInfo[];
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-enums-currency_receiving_type
export type ModelEnumsCurrencyReceivingType =
  | 'ACCEPT'
  | 'ACCEPT_OPEN'
  | 'DENY'
  | 'HOLD';

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-enums-disbursement_type
export type ModelEnumsDisbursementType = 'INSTANT' | 'DELAYED';

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-enums-facilitator_type
export type ModelEnumsFacilitatorType = 'API_CALLER' | 'INTERNAL' | 'PARTNER';

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-enums-liability_type
export type ModelEnumsLiabilityType = 'FULL' | 'PARTIAL';

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-enums-participant_type
export type ModelEnumsParticipantType = 'FACILITATOR' | 'RECEIVER' | 'SENDER';

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-enums-pricing_type
export type ModelEnumsPricingType = 'BLENDED' | 'IC_PLUS';

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-business
export interface ModelPerson extends ActivityTimestamps {
  id: string;
  external_id: string;
  primary: boolean;
  primary_email: string;
  emails: string[];
  phones: ModelPhoneInfo[];
  addresses: ModelAddressWithConfirmation[];
  names: string[];
  citizenship: string;
  birth_date: string;
  identifications: IdentityDocument;
}

// https://developer.paypal.com/api/orders/v2/#definition-order
export interface Order extends ActivityTimestamps {
  id: string;
  intent: string;
  links: LinkDescription[];
  payer: Payer;
  payment_source: PaymentSourceResponse;
  purchase_units: PurchaseUnit[];
  status: Status;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-model-phone_info
export interface ModelPhoneInfo {
  phone_number: Phone;
  phone_type: PhoneType;
}

export type PhoneType = 'FAX' | 'HOME' | 'MOBILE' | 'OTHER' | 'PAGER' | 'WORK';

// https://developer.paypal.com/docs/api/orders/v2/#definition-payer_base
export interface PayerBase {
  email_address: string;
  payer_id: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-payer
export interface Payer extends PayerBase {
  address: AddressPortable;
  birth_date: string;
  name: Name;
  phone: PhoneWithType;
  tax_info: TaxInfo;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-phone_with_type
export interface PhoneWithType {
  phone_type?: PhoneType;
  phone_number: {
    national_number: string;
  };
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-purchase_unit
export interface PurchaseUnit {
  amount: AmountWithBreakdown;
  custom_id: string;
  description: string;
  id: string;
  invoice_id: string;
  items: Item[];
  payee: Payee;
  payment_instruction: PaymentInstruction;
  payments: PaymentCollection;
  reference_id: string;
  shipping: ShippingDetail;
  soft_descriptor: string;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-customized_payment_source_2
export interface PaymentSourceRequest {
  /**
   * The tokenized payment source to fund a payment.
   */
  token?: {
    /**
     * The PayPal-generated ID for the token.
     */
    id: string;
    /**
     * The tokenization method that generated the ID.
     */
    type: string;
  };

  /**
   * Indicates that PayPal Wallet is the payment source.
   * Main use of this selection is to provide additional instructions associated with this choice like vaulting.
   */
  paypal?: {
    /**
     * Additional attributes associated with the use of this wallet.
     */
    attributes?: {
      /**
       * Attributes used to provide the instructions during vaulting of the PayPal Wallet.
       */
      vault?: {
        /**
         * Defines how and when the payment source gets vaulted.
         * 'ON_SUCCESS'
         */
        store_in_vault?: string;
        /**
         * The usage type associated with the PayPal payment token.
         */
        usage_type: string;
      };
      /**
       * The details about a customer in PayPal's system of record.
       */
      customer?: {
        /**
         * The unique ID for a customer generated by PayPal.
         */
        id?: string;
        /**
         * Email address of the buyer as provided to the merchant or on file with the merchant. Email Address is required if you are processing the transaction using PayPal Guest Processing which is offered to select partners and merchants.
         * For all other use cases we do not expect partners/merchant to send email_address of their customer.
         */
        email_address?: string;
        /**
         * Merchants and partners may already have a data-store where their customer information is persisted.
         * Use merchant_customer_id to associate the PayPal-generated customer.id to your representation of a customer.
         */
        merchant_customer_id?: string;
      };
    };
    /**
     * Customizes the payer experience during the approval process for payment with PayPal.
     */
    experience_context?: {
      /**
       * The label that overrides the business name in the PayPal account on the PayPal site. The pattern is defined by an external party and supports Unicode
       */
      brand_name?: string;
      /**
       * The BCP 47-formatted locale of pages that the PayPal payment experience shows. PayPal supports a five-character code.
       * For example, da-DK, he-IL, id-ID, ja-JP, no-NO, pt-BR, ru-RU, sv-SE, th-TH, zh-CN, zh-HK, or zh-TW.
       */
      locale?: string;
      /**
       * The type of landing page to show on the PayPal site for customer checkout.
       * @default "NO_PREFERENCE"
       */
      landing_page?: 'LOGIN' | 'GUEST_CHECKOUT' | 'NO_PREFERENCE';
      /**
       * The location from which the shipping address is derived.
       * @default "GET_FROM_FILE"
       */
      shipping_preference?: ShippingPreference;
      /**
       * Configures a Continue or Pay Now checkout flow.
       * @default `CONTINUE`
       */
      user_action?: UserAction;
      /**
       * The merchant-preferred payment methods.
       * @default 'UNRESTRICTED'
       */
      payment_method_preference?: 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED';
      /**
       * The URL where the customer will be redirected upon approving a payment.
       */
      return_url?: string;
      /**
       * The URL where the customer will be redirected upon cancelling the payment approval.
       */
      cancel_url?: string;
    };
  };
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-purchase_unit_request
export interface PurchaseUnitRequest {
  amount: AmountWithBreakdown;
  /**
   * [ 1 .. 127 ] characters
   * The API caller-provided external ID. Used to reconcile client transactions with PayPal transactions.
   * Appears in transaction and settlement reports but is not visible to the payer.
   */
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

export type Category = 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION';

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

// https://developer.paypal.com/docs/api/orders/v2/#definition-payment_collection
export interface PaymentCollection {
  authorizations: AuthorizationWithAdditionalData;
  captures: Capture[];
  refunds: Refund[];
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-authorization_with_additional_data
export interface AuthorizationWithAdditionalData {
  processor_response: ProcessorResponse;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-payment_source_response
export interface PaymentSourceResponse {
  card: CardResponse;
}

/**
 * Customize the payer experience during the approval process for the payment with PayPal.
 * @see {@link https://developer.paypal.com/docs/api/orders/v2/#definition-application_context}
 */
export interface OrderApplicationContext {
  /**
   * Provides additional details to process a payment using a payment_source that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
   * Parameter compatibility:
   * payment_type=ONE_TIME is compatible only with payment_initiator=CUSTOMER.
   * usage=FIRST is compatible only with payment_initiator=CUSTOMER.
   * previous_transaction_reference or previous_network_transaction_reference is compatible only with payment_initiator=MERCHANT.
   * Only one of the parameters - previous_transaction_reference and previous_network_transaction_reference - can be present in the request.
   */
  stored_payment_source?: StoredPaymentSource;
}

export type ShippingPreference =
  | 'GET_FROM_FILE'
  | 'NO_SHIPPING'
  | 'SET_PROVIDED_ADDRESS';

export type UserAction = 'CONTINUE' | 'PAY_NOW';

// https://developer.paypal.com/docs/api/orders/v2/#definition-payment_method
export interface PaymentMethod {
  payee_preferred: PayeePreferred;
  payer_selected: string;
  standard_entry_class_code: StandardEntryClassCode;
}

export type PayeePreferred = 'IMMEDIATE_PAYMENT_REQUIRED' | 'UNRESTRICTED';

export type StandardEntryClassCode = 'CCD' | 'PPD' | 'TEL' | 'WEB';

// https://developer.paypal.com/docs/api/orders/v2/#definition-stored_payment_source
export interface StoredPaymentSource {
  payment_initiator: PaymentInitiator;
  payment_type: PaymentType;
  usage?: Usage;
  previous_network_transaction_reference?: object;
}

// https://developer.paypal.com/docs/api/orders/v2/#definition-payment_initiator
export type PaymentInitiator = 'CUSTOMER' | 'MERCHANT';

export type PaymentType = 'ONE_TIME' | 'RECURRING' | 'UNSCHEDULED';

export type Usage = 'DERIVED' | 'FIRST' | 'SUBSEQUENT';

// https://developer.paypal.com/docs/api/orders/v2/#definition-patch
export interface Patch {
  from: string;
  op: Operation;
  path: string;
  value: any;
}

export type Operation = 'add' | 'copy' | 'move' | 'remove' | 'replace' | 'test';

export interface BaseOrderHeaders extends BaseHeaders {
  'Content-Type': 'application/json';
}
