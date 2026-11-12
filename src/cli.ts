/**
 * CLI entry point for the greet command.
 *
 * `run` is side-effect free apart from the injected io sink, so tests can
 * capture output without spawning a process. Executing this module directly
 * dispatches `process.argv` through `run` and sets the process exit code.
 */
import { pathToFileURL } from 'node:url';
import { greet } from './greet.ts';

export type CliIo = {
  writeOut: (chunk: string) => void;
  writeErr: (chunk: string) => void;
};

const defaultIo: CliIo = {
  writeOut: (chunk: string) => {
    process.stdout.write(chunk);
  },
  writeErr: (chunk: string) => {
    process.stderr.write(chunk);
  },
};

const USAGE = 'Usage: bdd-trial-cli greet <name>\n';

export function run(argv: readonly string[], io: CliIo = defaultIo): number {
  const shout = argv.includes('--shout');
  const positionals = argv.filter((arg) => arg !== '--shout');
  const [command, ...rest] = positionals;
  const name = command === 'greet' ? rest[0] : undefined;

  if (name === undefined) {
    io.writeErr(USAGE);
    return 1;
  }

  io.writeOut(`${greet(name, { shout })}\n`);
  return 0;
}

const entryPoint = process.argv[1];
const isDirectRun =
  entryPoint !== undefined && import.meta.url === pathToFileURL(entryPoint).href;

if (isDirectRun) {
  process.exitCode = run(process.argv.slice(2));
}
