/**
 * Startup report hook for the BDD acceptance suite.
 *
 * This module is not the executable entry point; `src/cli.ts` owns the
 * `run(argv, io)` command runner and its direct-run guard. `main` and
 * `STARTUP_REPORT` exist so the acceptance suite
 * (`features/step_definitions/cli-startup.ts`) can prove the TypeScript wiring
 * loads and reports the expected startup string.
 */
export const STARTUP_REPORT = 'bdd-trial-cli';

export function main(): string {
  return STARTUP_REPORT;
}
