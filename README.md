# Multibank Automation Project

## Overview

This repository contains a Playwright automation framework for the Multibank website (`https://mb.io/en/`).

It includes:
- Navigation validation tests
- Content and download link checks
- Desktop viewport layout validation
- Negative scenarios for broken links and timeout handling
- A simple page object model for reusable locators and actions

## Repository Structure

- `package.json` - project dependencies and package metadata
- `playwright.config.js` - Playwright configuration and browser projects
- `tests/` - test files and page objects
  - `NavigationLayout.spec.js` - navigation workflow and layout tests
  - `ContentAndLinks.spec.js` - banner and download-link validations
  - `NegetiveScenarios` - negative scenario checks (rename to `NegetiveScenarios.spec.js` to run automatically)
  - `pages/navigation.page.js` - shared locators and page actions for navigation flows

## Requirements

- Node.js 18+ (or compatible LTS version)
- Git installed on your machine
- Windows PowerShell or command prompt

## Setup

1. Install Node.js if not already installed.
2. Open the project folder in a terminal.
3. Install dependencies:

```powershell
npm install
```

## Run Tests

### Run all Playwright tests

```powershell
npm.cmd exec -- playwright test
```

### Run a specific test file

```powershell
npm.cmd exec -- playwright test tests/NavigationLayout.spec.js
```

### Run a test in headed mode on Chrome

```powershell
npm.cmd exec -- playwright test tests/NavigationLayout.spec.js --headed --project=chrome
```

### Run a single test by name

```powershell
npm.cmd exec -- playwright test --grep "Navigate to Home Page"
```

### Run tests with a single worker (serial execution)

```powershell
npm.cmd exec -- playwright test tests/NavigationLayout.spec.js --workers=1
```

## Page Object Model

The `tests/pages/navigation.page.js` file centralizes common locators and actions:
- `navLocator` - top navigation container
- `navItems` - navigation item links
- `CTADownloadApp` - download app CTA
- `MarketinBanner` - marketing banner section

Use this page object in tests to reduce duplication and improve maintainability.

## Important Notes

- The repository currently uses `test.describe.serial` for `NavigationLayout.spec.js` to ensure navigation tests run in order.
- If `tests/NegetiveScenarios` is not discovered by Playwright, rename it to `tests/NegetiveScenarios.spec.js`.
- Because PowerShell can block `npm` wrapper scripts, use `npm.cmd` on Windows.

## Adding New Tests

1. Add a new `*.spec.js` file under `tests/`.
2. Import page objects from `tests/pages/` when needed.
3. Use `test` and `expect` from `@playwright/test`.
4. Keep tests independent unless you explicitly need serial execution.

## Reporting

Playwright generates an HTML report by default via the configuration.
After a run, view it with:

```powershell
npm.cmd exec -- playwright show-report
```

## Troubleshooting

- If `git` is not recognized, install Git and add it to your PATH.
- If `playwright` commands fail, ensure `npm install` completed successfully.
- If pages are opening in parallel unexpectedly, use `--workers=1` or `test.describe.serial`.
