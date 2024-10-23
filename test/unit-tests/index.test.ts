import assert from 'node:assert/strict';
import { test, describe } from 'node:test';

describe('testing describe', () => {
  test('hello world', () => {
    assert.equal('hello', 'hello');
  });

  test('filer', () => {
    assert.notEqual('hello', 'hello23');
  });
});
