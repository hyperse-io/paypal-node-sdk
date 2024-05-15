import { AccessToken } from './AccessToken.js';
import { AccessTokenRequest } from './AccessTokenRequest.js';
import {
  LiveEnvironment,
  PayPalEnvironment,
  SandboxEnvironment,
} from './PayPalEnvironment.js';
import { PayPalHttpClient } from './PayPalHttpClient.js';
import { RefreshTokenRequest } from './RefreshTokenRequest.js';
import { TokenCache } from './TokenCache.js';

export const core = {
  AccessToken,
  AccessTokenRequest,
  PayPalEnvironment,
  LiveEnvironment,
  SandboxEnvironment,
  PayPalHttpClient,
  RefreshTokenRequest,
  TokenCache,
};
