import assert from 'node:assert/strict';
import { Given, Then, When } from '@cucumber/cucumber';
import { main } from '../../src/index.ts';

let report: string | undefined;

Given('the CLI entry point is available', function () {
  assert.ok(
    typeof main === 'function',
    'src/index.ts must export a callable main function',
  );
});

When('the CLI starts', function () {
  report = main();
});

Then('the CLI reports {string}', function (expected: string) {
  assert.equal(report, expected);
});
