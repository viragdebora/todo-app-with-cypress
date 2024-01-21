## Introduction

This project is about to explore Cypress, what kind of tests you can do with this testing framework.

This project built on React + Vite with TypeScript, including the solution for the AppAction.

## Prerequisites

- This project requires Node.js to be installed on your machine. Exact version is 18.16.0
- To install the dependencies run `npm install`

## To run the app

- `npm run dev`
- Open the app on http://localhost:5173

## Test levels

The repository contains three levels of testing:
- Component (Unit tests)
- E2E
- API

## Configuration

In order to be able to run your first test, you will need the environment variables stored at cypress.env.json at the root of the project with the corresponding credentails.

```json
{
    "user": "<Username>",
    "password": "<Password>"
}
```

There is also possibility to run the tests in AppAction or NonAppAction mode.
- AppActions are, instead of interacting through the UI elements, directly dispatch the actions using the application’s internal logic. You can read more about it [here](https://www.lambdatest.com/blog/cypress-app-actions/)
- NonAppAction, similar to the PO model

## To run E2E tests

1. First start the application
2. Start the tests:
    - headless mode: `npm run test:ui:headless`
    - headed mode: `npm run test:ui:headed`

## To run API tests

1. First start the application
2. Start the tests: `npm run test:api`

## To run Component test

1. Start the tests: `npm run test:component`
