import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { greet } from '../../src/greet.ts';
import { run } from '../../src/cli.ts';

type IoCapture = {
  io: {
    writeOut: (chunk: string) => void;
    writeErr: (chunk: string) => void;
  };
  stdout: () => string;
  stderr: () => string;
};

function capture(): IoCapture {
  let out = '';
  let err = '';

  return {
    io: {
      writeOut: (chunk: string) => {
        out += chunk;
      },
      writeErr: (chunk: string) => {
        err += chunk;
      },
    },
    stdout: () => out,
    stderr: () => err,
  };
}

describe('greet', () => {
  it('greets by name', () => {
    assert.equal(greet('Ada'), 'Hello, Ada!');
  });

  it('shouts the greeting when asked', () => {
    assert.equal(greet('Ada', { shout: true }), 'HELLO, ADA!');
  });

  it('uppercases a lowercase name when shouting', () => {
    assert.equal(greet('grace', { shout: true }), 'HELLO, GRACE!');
  });
});

describe('run', () => {
  it('writes the greeting and exits 0', () => {
    const captured = capture();

    const exitCode = run(['greet', 'Ada'], captured.io);

    assert.equal(exitCode, 0);
    assert.ok(
      captured.stdout().includes('Hello, Ada!'),
      `expected stdout to contain the greeting, got ${JSON.stringify(captured.stdout())}`,
    );
  });

  it('writes usage to stderr and exits 1 without a name', () => {
    const captured = capture();

    const exitCode = run(['greet'], captured.io);

    assert.equal(exitCode, 1);
    assert.equal(captured.stdout(), '');
    assert.ok(
      captured.stderr().includes('Usage: bdd-trial-cli greet <name>'),
      `expected stderr to contain the usage line, got ${JSON.stringify(captured.stderr())}`,
    );
  });

  it('honours --shout in any position', () => {
    const captured = capture();

    const exitCode = run(['--shout', 'greet', 'Ada'], captured.io);

    assert.equal(exitCode, 0);
    assert.ok(
      captured.stdout().includes('HELLO, ADA!'),
      `expected stdout to contain the shouted greeting, got ${JSON.stringify(captured.stdout())}`,
    );
  });
});
