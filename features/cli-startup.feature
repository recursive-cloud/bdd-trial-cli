Feature: CLI startup
  As a CLI maintainer
  I want the acceptance suite to start the CLI
  So that the BDD harness proves the TypeScript wiring

  @REC-5
  Scenario: The CLI starts through cucumber
    Given the CLI entry point is available
    When the CLI starts
    Then the CLI reports "bdd-trial-cli"
