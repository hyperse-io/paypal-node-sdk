import { type BaseHeaders } from '../core/HttpRequestBase.js';

export interface BaseCustomerHeaders extends BaseHeaders {
  'Content-Type': 'application/json';
}
