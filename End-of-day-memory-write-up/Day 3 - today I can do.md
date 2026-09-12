## TypeScript concepts and syntax
1. We can export object of an array as well as interface.
2. Interface in typescript defines the structure of object, mentioning the properties and types of those properties.
3. TypeScript provides type safety and acts as compiletime diagnostic which prevents errors and makes our code easy to maintain.
4. To export any class or object or interface, we use 'export' keyword at the start of it.
5. Syntax of interface: 
`interface User {
    username: string;
    password: string;
    isLocked: boolean;
}`
6. Syntax to import expect, test: 
`import { expect, test } from '@playwright/test'`
7. template literal syntax: `${<any variable>}`. Template literal allows us to add variables in strings.

## Promise, async and await
- **Promise** represents eventual completion (result) or failure. It resolves successfully or rejects with an error.
- **async** makes the function return promise and allows us to use 'await' inside function.
- **await** pauses the current async function (not the whole program) till the promise is settled (either success or failure)
- We need to use async/await for our function because some browser operations take time to complete.

## Typed test data and data-driven tests
- Typed test data is a normal, maintainable approach. TypeScript interfaces help ensure that test-data objects have the expected properties and types.
- data driven testing basically means running same test multiple times using different sets of data.
- Non-sensitive test data may live in a committed test-data file.
- Real passwords, tokens, and database credentials should normally come from protected environment variables.
- Locally, .env is excluded through .gitignore; in TypeScript, the value is accessed through process.env.
- We use template literals in place of string for data driven tests.
- typed array of users of type 'User' interface: 
`const users: User[] = [
{
    username: 'xyz',
    password: 'pass@123',
    isLocked: true
}, {
    username: 'abc',
    password: 'pass@321',
    isLocked: false
}]`
- example for...of loop:
``for (const eachUser of users) {
    test(`${eachUser.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(eachUser.username, eachUser.password);
    });}``

## Configuration settings and cross-browser execution
- We have many configurations settings inside 'playwright.config.ts' file. Namely: retries, baseURL, project configurations, trace, workers and many others which we can configure.
- we set number of retries and condition of retries through 'retries' configuration. The config setting is like this: `retries: process.env.CI ? 2 : 0` which means if the tests are running in continuous integration pipeline there should be 2 retries (original attempt plus 2 additional attempts) and if not meaning if tests are running locally, then there should be 0 retries.
- we set baseURL through baseURL config, and then we just need to use '/' instead of typing that full url inside our tests and it will use that set base URL from the config. Additionally we can add any path or to that url by just appending that path to '/', which represents the base url.
- trace records snapshot of our test run and includes realtime information about page state at each test step, each network request sent by browser during our test run, etc. Current configuration for trace is: `trace: 'on-first-retry'`, which means that the trace will be recorded only on first retry, after a failure. There are other options as well, which we can set the trace configuration to.
- workers means playwright processes and each playwright process allow the playwright to run one test at a time, so if we are setting 2 workers then playwright will use 2 worker processes and can execute 2 tests concurrently (not exactly simultaneously). The workers' configuration is this currently: `workers: process.env.CI ? 1 : undefined`, which means if the tests are running on ci pipeline, the number of workers should be 1 (one test running at a time) but if the tests are running locally, it is undefined - which makes playwright choose the appropriate number of workers based on our hardware capabilities.
- project configurations are used for cross-browser execution. We add the project configurations which are represented by browser configurations, inside our playwright.config.ts file, which makes our tests run in all those browsers or projects.
- additionally, we can also manually control which browser (or project or test configuration specifically) we want to use while running command in our terminal to run the tests.

## Hooks and built-in fixtures
- I don't know the definitions of hooks in playwright but I know that they help us reduce our code and make it convenient.
- hooks in playwright: beforeAll, beforeEach, afterAll, afterEach
- they don't always apply to the entire file or suite. When placed inside test.describe block, they apply to that particular group.
- if there's a code we want to run once before the entire test suite/file, we put it inside **beforeAll**. Syntax: `test.beforeAll('title', async ({ page }) => { //code });`
- if there's a code we want to run once before each of the test in our test suite/file, we put it inside **beforeEach**. Syntax: `test.beforeEach('title', async ({ page }) => { //code });`
- if there's a code we want to run only once at the end after the entire test suite/file is executed, we put it inside **afterAll**. Syntax: `test.afterAll('title', async ({ page }) => { //code });`
- if there's a code we want to run once after each of the test in our test suite/file, we put it inside **afterEach**. Syntax: `test.afterEach('title', async ({ page }) => { //code });`
- fixtures are readymade tools provided by playwright for us to use.
- there are 2 fixtures I know till now namely- page and request.
- **page** fixture gives each of our test a fresh, clean, brand new browser page separate from all the other tests.
- **request** fixture basically gives our test `APIRequestContext`, so that it allows our test script to send http requests to any url or end point or server and read the responses received from server.
- not every hook requires async and page fixture. Use 'async' only when the hook callback needs to await (wait for) asynchronous work. Hooks not necessarily require async always. async is required in the hooks when it includes code we need to await for its settlement.
- A hook receives the 'page' fixture only when it needs the per-test browser page; beforeAll and afterAll cannot use the per-test page fixture because they run outside an individual test's lifecycle.
- beforeEach and afterEach can use the per-test 'page' fixture.
- example of a hook which does not need page fixture: `test.beforeEach(() => {
});`. Include just callback arrow function.

## Tagging
- Tagging basically means giving each of our test a special tag in its title such as - '@smoke', '@functional', '@regression', etc. These are just naming conventions we add in test titles.
- The use of tagging is that, we can actually organize tests under each tag and through certain command execute all the tests containing that particular tag. This gives us freedom to organize many tests under for example: smoke tests, functional tests, regression tests, regression + functional tests, etc.
- Example command to run the tagged tests: `npx playwright test -g "@smoke"` - this will run all the tests whose title contains tag '@smoke'.
- -g or --grep searches the full test title, it does not create formal groups.

## Every playwright command learned today (more like every playwright command I remember from today)
1. `npx playwright test` - runs whole test suite
2. `npx playwright test -g "tagname"` - runs every test containing 'tagname' in its title
3. `npx playwright test tests/testfile.spec.ts` - runs only the mentioned test file
4. `npx playwright test --project=webkit` - runs all the tests from suite/file inside only webkit browser project
5. `npx playwright test --workers=2` - runs all the tests using only 2 worker processes (roughly 2 tests concurrently, not exactly simultaneously)
6. `npx playwright test --project=chromium --workers=3` - runs all the tests inside only chromium project and using 3 worker processes at a time.
7. `npx playwright test --trace on` - compulsorily records trace on each test execution.
8. `npx playwright test --debug` - opens playwright inspector tool along with browser window.
9. `npx playwright test --ui` - opens playwright ui mode or playwright test runner, where we can see trace, locator details, each step, page state during each test step, our entire test suites/files with each of the tests inside it.
10. `npx playwright codegen <url>` - opens the code generator of playwright and records our manual actions in code format.
11. `npx playwright test --headed` - runs the test suite in headed mode, where browser window is opened and we can witness the test execution live on browser, though it is very fast.
12. `npx playwright test --reporter=list` - runs the test suite but mentions some details such as name of each test or test titles in terminal.
13. `npx playwright show-report` - opens the last report (may not open the report right after successful test run, unless configured from playwright.config.ts (although idk how to do that configuration))
14. `npx playwright test --grep-invert '@smoke'` - this will run all the tests excluding the tests containing '@smoke' inside their titles
15. `npx playwright test --workers=1` - runs all the test files using only one worker process.
16. `npx playwright test --retries=2` - this will run the tests for 2 additional attempts if original run fails. This overrides the config in playwright.config.ts.

## UI Mode, Debug Mode, headed mode, trace, report, and codegen
- UI mode - it is playwright test runner, which has all the test suites/files along with tests inside and contains all the info such as trace, locators, etc.
- Debug mode - playwright inspector and browser window is opened, where we can observe each step by clicking step over one by one, to pinpoint the buggy step/line.
- headed mode - runs tests in visible browser window/s
- trace - It is a snapshot of entire test containing network details (requests sent and responses received), page state at each step and helps us pinpoint the exact state at the time of bug.
- report - The HTML reporter produces a report for the run. `npx playwright show-report` opens the latest report.
- codegen - it helps us generate initial code and observe the new web app before writing proper test scripts. Codegen proposes Locators that may work, but generated code must be reviewed for repetition, maintainability and meaningful assertions.