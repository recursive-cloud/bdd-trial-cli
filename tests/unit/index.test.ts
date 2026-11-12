import assert from 'node:assert/strict';
import { test } from 'node:test';
import { main } from '../../src/index.ts';

test('main reports the CLI name', () => {
  assert.equal(main(), 'bdd-trial-cli');
});
