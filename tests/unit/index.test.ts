import assert from 'node:assert/strict';
import { test } from 'node:test';
import { main, STARTUP_REPORT } from '../../src/index.ts';

test('STARTUP_REPORT pins the report the acceptance suite expects', () => {
  assert.equal(STARTUP_REPORT, 'bdd-trial-cli');
});

test('main reports the startup report string', () => {
  assert.equal(main(), STARTUP_REPORT);
});
