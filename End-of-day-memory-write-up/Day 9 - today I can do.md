## POM flow

- Page object classes import `Locator` and `Page` from `@playwright/test`:

```ts
import { Locator, Page } from '@playwright/test';
```

- Test files import `test` and `expect` from `@playwright/test`:

```ts
import { test, expect } from '@playwright/test';
```

- Page objects encapsulate locators and actions, so test files describe the business flow instead of UI implementation details.
- Declare the `page` and then the locators as `readonly` properties, and initialize them in the constructor:

```ts
constructor(page: Page) {
  this.page = page;
  // initialize all the remaining locators here
}
```

- Write actions/methods with the `async` keyword at the start, then include arguments if required and write down the steps for that action/method.
- Use `await` for Playwright actions, web-first assertions, `page.goto`, request methods, and `response.json()`. Synchronous values such as `response.status()` and an array's `.length` do not need `await`.

- In the test script, start the test suite like this:

```ts
test.describe('test-suite-name', () => {
  // tests go here
});
```

- Test block syntax is like this:

```ts
test('test-name', async ({ page }) => {
  // test steps go here
});
```

- For an API test, the outer `test()` shape is similar, but the fixture changes from `{ page }` to `{ request }`, and the operations/assertions are different.

- Create objects of the page objects at the start of the test if they are going to be used. This is not an issue because Playwright `Locator` objects are lazy. Creating a page-object instance does not locate or interact with an element; the locator is resolved when an action or assertion uses it.

### Dynamic scoped locator

```ts
const item = this.productCard.filter({ hasText: productName });
await item.getByRole('button', { name: /add to cart/i }).click();
```

- `productName` is a string parameter, not a new locator. The repeated product card is scoped first, and then the button is searched inside that card.

### Locator details from debugging

```ts
page.getByRole('button', { name: 'Login', exact: true })
```

- Without `exact: true`, role-name matching can match a substring such as `Log` inside `Login`.
- The accessible role must match the actual element. In my run, Logout was a `button`, not a `link`.

### POM flow I completed

- The page objects were `LoginPage`, `InventoryPage`, `CartPage`, and `CheckoutPage`.
- The flow was: login; add two variable-selected products; assert the cart count; open the cart; assert the item count; checkout; fill the customer details; finish; assert the success message; return home; and logout.

## workflow

- A basic GitHub Actions workflow has a `name`, an `on` event, and `jobs`.
- `on: push` means the workflow runs when code is pushed.
- Under `jobs`, I can define a job ID such as `tests`.
- The job uses `runs-on: ubuntu-latest` to run on a remote Ubuntu machine.

```yaml
name: Playwright tests

on: push

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci

      - run: npx playwright install --with-deps

      - run: npx playwright test

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

- `actions/checkout@v4` checks out the repository code.
- `actions/setup-node@v4` sets up Node.js, and `node-version: 20` selects the Node version.
- `npm ci` installs the dependencies from the lock file.
- `npx playwright install --with-deps` installs the Playwright browsers and the Linux dependencies.
- `npx playwright test` runs the tests.
- The report is uploaded as an artifact even when a test fails.
- `with:` belongs under the action it configures, such as `setup-node`; it does not belong under the later `npm ci` step.
- CI runs the test automatically on a remote machine when code is pushed, and the uploaded report lets the team inspect the results even when tests fail.

## debugging distinctions

- If the locator matches no element, I should suspect a bad locator, the wrong page, the wrong role or name, or an incorrect test state.
- If it matches an element but the action cannot proceed, I should inspect visibility, enabled state, overlays, and timing.
- If it works locally but fails intermittently in CI, I should investigate unstable locators, race conditions or external dependencies, slower CI execution, and test-data/state isolation.
- I should prefer stable locators, web-first assertions, response/event waits, and independent test data. I should avoid using arbitrary `waitForTimeout` as the main fix.

### Debugging tools

- `--headed`: runs normally with the browser visible.
- `--ui`: opens the interactive Playwright test runner for selecting and inspecting tests.
- `--debug`: opens Playwright Inspector for pausing and stepping through actions.
- Trace viewer: investigates a completed run using action steps, DOM snapshots, screenshots, network information, and errors.
- Use traces on retry, UI Mode, and debug mode for different purposes.

### Error-first routine

- Read the error aloud.
- Identify the line and locator.
- Say what the error claims.
- Form a hypothesis.
- Change one thing.
- Rerun the test.

### Planted-bug examples

- Bad locator: using `Submit` when the real button is `Login`.
- Missing `await`: `const body = response.json()` and then using `body.title`, which can be undefined or produce a Promise type error.
- Wrong assertion: expecting `Order completed` when the page says `Thank you for your order!`.

## API patterns

- `request` is the Playwright API fixture, while `page` is the browser/UI fixture.
- The outer test shape is similar to a UI test, but the fixture changes from `{ page }` to `{ request }` and the operations/assertions are different.

### POST request

```ts
test('POST-request', async ({ request }) => {
  const response = await request.post('url/endpoint', {
    data: { data goes here }
  });

  expect(response.status()).toBe(201);
  const jsonBody = await response.json();
  expect(jsonBody.title).toBe('whatever property value we need to assert');
});
```

- A POST commonly returns `201`, but the assertion must follow the actual API contract.
- `response.status()` is synchronous response metadata.
- `response.json()` returns a Promise and therefore needs `await`.

### GET request

```ts
const response = await request.get('https://jsonplaceholder.typicode.com/users');
expect(response.status()).toBe(200);
const body = await response.json();
expect(body.length).toBeGreaterThan(0);
```

- An array's `.length` is synchronous, so it does not need `await`.

### Negative API test

```ts
const response = await request.get(
  'https://jsonplaceholder.typicode.com/invalid-endpoint'
);
expect(response.status()).toBe(404);
```

- API tests should assert both the status and the relevant response-body structure.
- API setup can make UI tests faster by creating the required data before the UI flow.

## commands I used

- Create a new Playwright project:

```bash
npm init playwright@latest
```

- Check TypeScript without emitting compiled files:

```bash
npx tsc --noEmit
```

- Run the machine end-to-end test:

```bash
npx playwright test tests/day9-machine-e2e.spec.ts
```

- Run the machine end-to-end test in UI Mode:

```bash
npx playwright test tests/day9-machine-e2e.spec.ts --ui
```

- Run the machine end-to-end test in debug mode:

```bash
npx playwright test tests/day9-machine-e2e.spec.ts --debug
```

- Run the API test:

```bash
npx playwright test tests/day9-api.spec.ts
```

- Open the HTML report:

```bash
npx playwright show-report
```

- Open a saved trace:

```bash
npx playwright show-trace path/to/trace.zip
```

- `--ui` and `--headed` are different. UI Mode is an interactive test runner, while headed mode only makes the browser visible.

## new-tab pattern

- Introduced but not independently demonstrated: waiting for a new tab with `context.waitForEvent('page')`.
- I should not claim this as secure recall yet.
- The key principle is to start the event wait before the click:

```ts
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.getByRole('link', { name: 'Open new tab' }).click()
]);
```

## items that still feel fragile

- Workflow recall is still fragile, especially the YAML nesting under `jobs`, `steps`, the action's `with:`, and the order of the install and test commands.
- Debugging distinctions are still fragile: I need to first decide whether the locator matches nothing or matches an element that is not actionable.
- The difference between `--headed`, `--ui`, `--debug`, and Trace Viewer needs more practice.
- The new-tab pattern with `context.waitForEvent('page')` is introduced but not independently demonstrated, so it is not secure recall yet.
- API recall still needs attention around `await response.json()`, synchronous `response.status()`, status-code contracts, and asserting response-body structure.
- Dynamic scoped locators and exact role-name matching should be practised again until I can write them without prompts.
