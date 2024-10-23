import type { RequestHandler } from 'msw';
import { setupServer } from 'msw/node';
import { partnerReferral } from './customer/partnerReferral.js';
import { partnerReferralGet } from './customer/partnerReferralGet.js';
import { getToken } from './getToken.js';
import { authorizeOrder } from './order/authorizeOrder.js';
import { captureOrder } from './order/captureOrder.js';
import { confirmPayment } from './order/confirmPayment.js';
import { createOrder } from './order/createOrder.js';
import { orderDetail } from './order/orderDetail.js';
import { patchOrder } from './order/patchOrder.js';
import { authorizeationsVoid } from './payments/authorizationsVoid.js';
import { authorizedPaymentDetail } from './payments/authorizedPaymentDetail.js';
import { captureAuthorizedPayment } from './payments/captureAuthorizedPayment.js';
import { capturePaymentDetail } from './payments/capturePaymentDetail.js';
import { reauthorizeAuthorizedPayment } from './payments/reauthorizeAuthorizedPayment.js';
import { refundCapturePayment } from './payments/refundCapturePayment.js';
import { refundDetail } from './payments/refundDetail.js';
import { createWebhook } from './webhook/createWebhook.js';
import { VerifyWebhook } from './webhook/verifyWebhook.js';
import { deleteWebhook } from './webhook/webhookDelete.js';
import { webhookDetail } from './webhook/webhookDetail.js';
import { webhookList } from './webhook/webhookList.js';
import { webhookUpdate } from './webhook/webhookUpdate.js';

const handlers: Array<RequestHandler> = [
  getToken(),

  createOrder(),
  confirmPayment(),
  captureOrder(),
  orderDetail(),
  patchOrder(),
  authorizeOrder(),

  partnerReferral(),
  partnerReferralGet(),

  authorizeationsVoid(),
  authorizedPaymentDetail(),
  captureAuthorizedPayment(),
  capturePaymentDetail(),
  refundCapturePayment(),
  refundDetail(),
  reauthorizeAuthorizedPayment(),

  createWebhook(),
  webhookDetail(),
  webhookList(),
  webhookUpdate(),
  deleteWebhook(),
  VerifyWebhook(),
];

export const server = setupServer(...handlers);

// token -> create order (intent: CAPTURE) -> confirm payment -> capture payment for order
// token -> create order (intent: AUTHORIZE) -> confirm payment -> authorize payment for order
