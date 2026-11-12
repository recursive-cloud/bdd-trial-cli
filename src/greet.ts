/**
 * Greeting logic.
 *
 * Pure and side-effect free so unit tests and the CLI wrapper can share it.
 */
export type GreetOptions = {
  shout?: boolean;
};

export function greet(name: string, options: GreetOptions = {}): string {
  if (options.shout === true) {
    return `HELLO, ${name.toUpperCase()}!`;
  }

  return `Hello, ${name}!`;
}
