/**
 * Greeting logic.
 *
 * Pure and side-effect free so unit tests and the CLI wrapper can share it.
 *
 * Caller-owned invariant: `greet` accepts any name, including the empty string
 * (which yields `Hello, !`). The CLI layer in `src/cli.ts` owns the non-empty
 * name validation.
 */
export type GreetOptions = {
  shout?: boolean;
};

export function greet(name: string, options: GreetOptions = {}): string {
  if (options.shout) {
    return `HELLO, ${name.toUpperCase()}!`;
  }

  return `Hello, ${name}!`;
}
