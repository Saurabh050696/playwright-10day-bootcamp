## Commands I remember from today
- playwright installation command: `npm init playwright@latest`
- running all the test files of project: `npx playwright test`
- running all the test files in headed mode: `npx playwright test --headed`
- running test/s with their common name: `npx playwright test -g "login"`
- running all the test files with specific browser: `npx playwright test --project=chromium`
- running all the test files in headed mode as well as in only one specific brower: `npx playwright test --headed --project=chromium`
- opening playwright report: `npx playwright show-report`
- running a specific test: `npx playwright test tests/benchmark.spec.ts`

## Syntax patterns I remember from today
> test suite syntax (at the start, in every test file):
- `test.describe("test suite name", () => {
    // tests go here
});`

> test syntax: 
- `test("test name", async ({ page }) => {
    // test steps go here, each step starting with 'await' compulsorily
});`

> beforeEach hook syntax (goes inside test suite describe block at the start, before all tests):
- `test.beforeEach(async ({ page }) => {
    // steps/script we want to run before each test go here
});`

> to navigate to a page: `await page.goto("url of the page or '/'");`

> perform action on an element (click or fill): `await page.locator('unique attribute with or without tagname').fill("value");`

> performing action on an element by locating it by its role (four main roles for my level- textbox, heading, button, link(requires 'a' tag with href attribute)): `await page.getByRole('role', { name: 'click on accessibilty tree button in DOM to get this value' }).fill("value");`

> asserting visiblity of an element: `await expect(page.locator()).toBeVisible();`

> asserting url substring: `await expect(page).toHaveURL(/.*substring/);`

## File structure that appears after installing playwright in a folder
- 2 folders: `node_modules` and `tests`
- 4 files: `.gitignore`, `package.json`, `package-lock.json`, `playwright.config.ts`

## Facts I learned today
- we don't add/push these folders - `node_modules`, `playwright-report` and `test-results` on our github repo because they can be generated again and will eat up unnecessary storage of our github repo.
- `.gitignore` contains the folders/files we want to exclude from github. `playwright.config.ts` contains confugurations such as projects/browsers to use, base url, test directory folder, etc. `package-lock.json` saves the dependency versions.
- playwright recommends using getByRole above all the locator styles, wherever possible because it is user faced style and if these locators are failing, it can be proper failure as it can denote user convenience for finding that element on ui during normal usage. It is not developer faced.
- `Flakiness`: A flaky test is one that sometimes passes and sometimes fails with no code change. Causes of flakiness are lack of awaits, wrong timeout assumptions, unstable network, unstable locators.