import assert from 'node:assert/strict';
import { Given, Then, When } from '@cucumber/cucumber';

type Main = () => string | Promise<string>;

let main: Main | undefined;
let report: string | undefined;

Given('the CLI entry point is available', async function () {
  const entryPoint: { main?: unknown } = await import('../../src/index.ts');
  const candidate = entryPoint.main;
  assert.ok(
    typeof candidate === 'function',
    'src/index.ts must export a callable main function',
  );
  main = candidate as Main;
});

When('the CLI starts', async function () {
  assert.ok(main, 'the CLI entry point must be loaded before the CLI starts');
  report = await main();
});

Then('the CLI reports {string}', function (expected: string) {
  assert.equal(report, expected);
});
