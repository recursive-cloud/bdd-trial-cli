import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { greet } from '../../src/greet.ts';
import { run } from '../../src/cli.ts';
import type { CliIo } from '../../src/cli.ts';

type IoCapture = {
  io: CliIo;
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

  it('accepts the empty string; the CLI layer owns non-empty validation', () => {
    assert.equal(greet(''), 'Hello, !');
  });
});

describe('run', () => {
  it('writes the greeting and exits 0', () => {
    const captured = capture();

    const exitCode = run(['greet', 'Ada'], captured.io);

    assert.equal(exitCode, 0);
    assert.equal(captured.stdout(), 'Hello, Ada!\n');
  });

  it('writes usage to stderr and exits 1 without a name', () => {
    const captured = capture();

    const exitCode = run(['greet'], captured.io);

    assert.equal(exitCode, 1);
    assert.equal(captured.stdout(), '');
    assert.equal(captured.stderr(), 'Usage: bdd-trial-cli greet <name>\n');
  });

  it('writes usage to stderr and exits 1 for an empty name', () => {
    const captured = capture();

    const exitCode = run(['greet', ''], captured.io);

    assert.equal(exitCode, 1);
    assert.equal(captured.stdout(), '');
    assert.equal(captured.stderr(), 'Usage: bdd-trial-cli greet <name>\n');
  });

  it('writes usage to stderr and exits 1 for extra positionals', () => {
    const captured = capture();

    const exitCode = run(['greet', 'Ada', 'extra'], captured.io);

    assert.equal(exitCode, 1);
    assert.equal(captured.stdout(), '');
    assert.equal(captured.stderr(), 'Usage: bdd-trial-cli greet <name>\n');
  });

  it('honours --shout in any position', () => {
    const captured = capture();

    const exitCode = run(['--shout', 'greet', 'Ada'], captured.io);

    assert.equal(exitCode, 0);
    assert.equal(captured.stdout(), 'HELLO, ADA!\n');
  });
});
