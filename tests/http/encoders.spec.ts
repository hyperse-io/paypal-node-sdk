import { describe, expect, it } from 'vitest';
import { decodeBody, encodeBody } from '../../src/http/encoders.js';

describe('encodeBody', () => {
  it('returns undefined for null/undefined bodies so Content-Length is omitted', () => {
    expect(encodeBody(null, {})).toBeUndefined();
    expect(encodeBody(undefined, {})).toBeUndefined();
  });

  it('serializes JSON bodies', () => {
    const result = encodeBody(
      { intent: 'CAPTURE' },
      { 'content-type': 'application/json' }
    );

    expect(result).toBe('{"intent":"CAPTURE"}');
  });

  it('matches content types with charset parameters', () => {
    const result = encodeBody(
      { a: 1 },
      { 'content-type': 'application/json; charset=utf-8' }
    );

    expect(result).toBe('{"a":1}');
  });

  it('serializes urlencoded bodies and skips empty values', () => {
    const result = encodeBody(
      {
        grant_type: 'client_credentials',
        refresh_token: '',
        scopes: undefined,
      },
      { 'content-type': 'application/x-www-form-urlencoded' }
    );

    expect(result).toBe('grant_type=client_credentials&refresh_token=');
  });

  it('passes through already serialized strings', () => {
    expect(encodeBody('raw', {})).toBe('raw');
  });

  it('falls back to JSON when no encoder matches', () => {
    expect(encodeBody({ a: 1 }, {})).toBe('{"a":1}');
  });
});

describe('decodeBody', () => {
  it('returns undefined for empty responses (204)', () => {
    expect(decodeBody('', 'application/json')).toBeUndefined();
  });

  it('parses JSON', () => {
    expect(decodeBody('{"id":"1"}', 'application/json')).toEqual({ id: '1' });
  });

  it('treats a missing content type as JSON', () => {
    expect(decodeBody('{"id":"1"}')).toEqual({ id: '1' });
  });

  it('returns raw text when the body is not JSON', () => {
    expect(decodeBody('not-json', 'application/json')).toBe('not-json');
  });
});
