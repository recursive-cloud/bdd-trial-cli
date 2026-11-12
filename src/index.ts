/**
 * CLI entry point.
 *
 * The startup API is deliberately side-effect free: calling `main` returns the
 * report the caller (the acceptance suite or a future CLI wrapper) displays.
 */
export function main(): string {
  return 'bdd-trial-cli';
}
