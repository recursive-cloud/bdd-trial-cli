Feature: Greeting
  As a CLI user
  I want the tool to greet me by name
  So that the session feels personal

  @REC-6
  Scenario: Plain greeting
    When the CLI runs "greet Ada"
    Then stdout is "Hello, Ada!"

  @REC-6
  Scenario: Shouted greeting
    When the CLI runs "greet Ada --shout"
    Then stdout is "HELLO, ADA!"

  @REC-6
  Scenario: Greeting without a name
    When the CLI runs "greet"
    Then the exit code is 1
    And stderr contains "Usage: bdd-trial-cli greet <name>"
