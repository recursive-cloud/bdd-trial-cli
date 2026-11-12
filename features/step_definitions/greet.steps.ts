import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { Before, Then, When } from '@cucumber/cucumber';

const CLI_TIMEOUT_MS = 3_000;
const CLI_SCRIPT = fileURLToPath(new URL('../../src/cli.ts', import.meta.url));

type CliResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
};

let result: CliResult | undefined;

Before(function () {
  result = undefined;
});

function runCli(command: string): Promise<CliResult> {
  const argv = command
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [CLI_SCRIPT, ...argv], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const childStdout = child.stdout;
    const childStderr = child.stderr;
    assert.ok(childStdout, 'the CLI process must expose piped stdout');
    assert.ok(childStderr, 'the CLI process must expose piped stderr');

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
      reject(
        new Error(
          `CLI did not exit within ${CLI_TIMEOUT_MS}ms: ${command}` +
            `\nstdout: ${JSON.stringify(stdout)}\nstderr: ${JSON.stringify(stderr)}`,
        ),
      );
    }, CLI_TIMEOUT_MS);

    childStdout.setEncoding('utf8');
    childStderr.setEncoding('utf8');
    childStdout.on('data', (chunk: string) => {
      stdout += chunk;
    });
    childStderr.on('data', (chunk: string) => {
      stderr += chunk;
    });
    child.on('error', (error) => {
      clearTimeout(timer);
      reject(
        new Error(
          `failed to run the CLI with argv ${JSON.stringify(argv)}: ${error.message}` +
            `\nstdout: ${JSON.stringify(stdout)}\nstderr: ${JSON.stringify(stderr)}`,
        ),
      );
    });
    child.on('close', (exitCode) => {
      clearTimeout(timer);

      if (timedOut) {
        return;
      }

      resolve({ stdout, stderr, exitCode });
    });
  });
}

When('the CLI runs {string}', async function (command: string) {
  result = await runCli(command);
});

Then('stdout is {string}', function (expected: string) {
  assert.ok(result, 'the CLI must have run before asserting stdout');
  assert.equal(result.stdout.replace(/\r?\n$/, ''), expected);
});

Then('the exit code is {int}', function (expected: number) {
  assert.ok(result, 'the CLI must have run before asserting the exit code');
  assert.equal(result.exitCode, expected);
});

Then('stderr contains {string}', function (expected: string) {
  assert.ok(result, 'the CLI must have run before asserting stderr');
  assert.ok(
    result.stderr.includes(expected),
    `expected stderr to contain ${JSON.stringify(expected)}, got ${JSON.stringify(result.stderr)}`,
  );
});
