## Definitions and things I learned

### Testing and test documentation

1. **Test strategy:** It is a high-level document which defines the organization’s overall testing approach, principles, standards, and methods, and it is less specific to a project.

2. **Test plan:** It is a project-specific document which defines resources, testing approach, and entry/exit criteria at a project level. It may also include the test environment, schedule, responsibilities, risks.

3. **RTM:** It is a document which maps requirements to test cases and execution results. It helps prove test coverage and reveal requirements without tests; it does not prove that every requirement already has coverage.

4. **BDD:** Behavior-Driven Development means the developers, business, and QA discuss and agree upon the user stories or requirements through examples, and those examples are written in Gherkin language.

   - A feature file contains the feature and its Gherkin scenarios.
   - Step definitions connect each `Given`/`When`/`Then` step to executable automation code.
   - `Given` describes context, `When` describes an action or event, `Then` describes the observable result, and `And` adds another condition, action, or result.

5. **Gherkin:** It is a structured language used to write the examples of the BDD approach using keywords: `Given` (precondition or context), `When` (action or event), `Then` (observable result), and `And` (to add another condition, action, or result).

6. **Test scenario:** It is a high-level condition or statement that defines what to test.

7. **Test case:** It is a low-level, detailed document which defines how to test and contains fields such as test ID, title, preconditions, test data, steps, expected results, actual results, and status.

8. **Testing types:**

   1. **Smoke testing:** It is a quick, broad, and shallow check of critical functionality to decide if a new build is stable enough for deeper testing.

   2. **Sanity testing:** It is a narrow, focused check of the changed area and closely related functionality after a small change or fix.

   3. **Regression testing:** It is running the previously passed tests again to verify that previously working functionality is not broken. It may follow a new feature, bug fix, configuration change, or dependency update.

   4. **Retesting:** It is running the previously failed test after a fix to make sure it is passing now. It checks the specific previously failing test after the fix.

9. **Functional testing:** It checks whether a feature behaves according to its specified requirements.

10. **Integration testing:** It checks whether two or more modules or services work correctly together, including their data exchange.

11. **System testing:** It tests the complete integrated application end to end against its requirements.

12. **UAT:** User Acceptance Testing is testing in which business stakeholders or intended users validate whether the complete system meets business needs and is acceptable for release.

13. **Exploratory testing:** It is testing in which the tester learns about the product, designs tests, and executes them at the same time instead of following only prewritten cases.

14. **Ad-hoc testing:** It is informal, unplanned testing without predefined test cases, often used to look quickly for obvious problems.

15. **Cross-browser testing:** It verifies consistent behavior across browsers such as Chromium/Chrome, Firefox, and WebKit/Safari.

16. **Compatibility testing:** It verifies behavior across environments such as browsers, operating systems, devices, screen sizes, and sometimes network conditions. Cross-browser testing is one part of compatibility testing.

17. **Smoke versus sanity:** Smoke testing is broad and shallow, checking whether a new build is stable enough for deeper testing; sanity testing is narrow and focused, checking a changed area and nearby functionality.

18. **Regression versus retesting:** Retesting checks the specific failed defect after a fix; regression testing checks that previously working functionality still works after a relevant change.

19. **Test scenario versus test case:**

   1. **Test scenario:** It is a high-level statement describing what to test.

   2. **Test case:** It contains detailed instructions, preconditions, test data, steps, and expected results describing how to test one specific check.

20. **Test summary/execution report:**

   1. Scope and features tested
   2. Environment and build tested
   3. Execution counts: passed, failed, blocked, and not run
   4. Defects raised, grouped by severity and status
   5. Outstanding risks or limitations
   6. QA recommendation: Go, No-Go, or Go with known risks

### Scoping dynamic locator

```javascript
const productName = 'Blue bag';
const productCards = page.locator('.product_details');
const productCard = productCards.filter({ hasText: productName });
await productCard.getByRole('button', { name: /add to cart/i }).click();
```

### Agile and Scrum vocabulary

21. **Agile:** It is an approach to software development that delivers useful increments in short cycles and adapts to feedback and changing requirements.

22. **Scrum:** It is an Agile framework with defined roles, events, and artifacts for managing work in short cycles.

   - **Sprint:** It is a time-boxed period usually lasting 2 weeks, during which a team works to complete the work items from the Sprint Backlog.

23. **Product backlog:** It is the ordered list of product work, including features, improvements, bugs, and technical tasks.

24. **Sprint backlog:** It is the selected subset of Product Backlog items for the current sprint, together with the team’s plan to complete them.

25. **Sprint Goal:** It is the outcome the team intends to achieve during the sprint.

26. **Shippable increment:** It is the usable, integrated improvement produced during a sprint that meets the team’s quality standard and could be released if the business chooses.

27. **Sprint Planning:** It is a meeting where the team selects work, agrees on the Sprint Goal, and creates the Sprint Backlog.

28. **Daily Scrum:** It is a meeting where Developers briefly inspect progress toward the Sprint Goal, coordinate work, and raise blockers.

29. **Sprint Review:** It is a meeting at the end of the sprint where the team presents the completed increment to stakeholders and gathers feedback.

30. **Sprint Retrospective:** It is a meeting attended by team members where the team reflects on its process and agrees on specific improvement actions for the next sprint.

### Other Agile and project-management items

31. **Jira:** It is an issue-tracking and project-management tool used by teams to manage user stories, tasks, and defects. QA uses it to log defects with steps and evidence, update the defect status, and link bugs to user stories.

32. **User story:** It represents the needs and requirements of the users.

   **Format:**

   `As a [type of user], I want [capability], so that [benefit].`

33. **Acceptance criteria:** It includes the conditions that must be met to satisfy the user story. Acceptance criteria are specific, observable conditions that must be satisfied for that particular user story to be accepted. They can be written using `Given`, `When`, and `Then`.

34. **Definition of Done:** It is the team’s shared checklist for deciding that a work item is complete and meets the team’s quality standard.

   1. Acceptance criteria are fulfilled.
   2. Code is reviewed and integrated into the relevant branch.
   3. Relevant tests pass and no critical blockers or unacceptable high-severity defects remain.

### Terms encountered during Day 6

- **Triage:** Reviewing defects to confirm, classify, prioritize, assign, defer, reject, or duplicate them.
- **Priority:** How urgently something should be addressed.
- **Execution status:** The result or current state of a test, such as Pass, Fail, Blocked, or Not Run.
- **Defect ID:** The unique identifier used to find and track a reported defect.
- **Blocked:** Unable to complete testing because a required condition, dependency, or environment is unavailable.
- **N/A:** Not applicable in that situation.