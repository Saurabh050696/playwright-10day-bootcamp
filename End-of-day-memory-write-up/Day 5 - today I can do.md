## STLC phases and meanings
1. Requirement analysis: We analyze the requirements and their feasibility.
2. Test planning: We decide test strategy/approach, add scope, and entry/exit criteria.
3. Test case development: It involves writing test cases, preparing test data and required test conditions.
4. Environment setup: We configure hardware/software required for test execution.
5. Test execution: We execute the test cases, record bugs/defects we found.
6. Test closure: We document the lessons learned, outstanding risks/defects and formally close the testing.

## defect lifecycle and alternate states
1. New
2. Assigned
3. Open
4. Fixed
5. Retest
6. Verified
7. Closed

Alternate states:
1. Rejected: If developer thinks that the reported defect is not a defect but a feature, it is called 'Rejected'.
2. Duplicate: If the same reported bug was reported by someone else from the team in the past, it is called 'Duplicate'.
3. Deferred: If a team decides to postpone the fixing of a bug because either the bug is of low priority or due to any other reason, it is called 'Deferred'.
4. Reopened: If a defect appeared again during retesting, it is reopened by QA or product owner, it is called 'Reopened'.

## severity versus priority
Severity: The impact of a bug/defect on a system or business functionality.
Priority: How urgently the team should fix a bug.

## bug-report fields
1. ID
2. Title
3. Environment
4. Steps to reproduce
5. Test data
6. Expected result
7. Actual result
8. Severity
9. Priority
10. Attachments
11. Status

## test-case fields
1. Test Case ID
2. Title
3. Precondition
4. Steps
5. Test data
6. Expected result
7. Actual result
8. Status

## functional testing versus UI testing
Functional testing tests the system or business functionality, whereas UI testing mainly tests the elements and appearance of web interface. There could be some tests which come in the category of both functional testing as well as UI testing, for example, testing if error message is displayed or not.

## Playwright assertion pattern
1. await expect(locator).toBeVisible();
2. const productName = 'Sauce Labs Backpack'
const productCards = page.locator('.product_details');
const matchingCard = productCards.filter({ hasText: productName });
const priceOfMatchingCard = matchingCard.locator('.price');