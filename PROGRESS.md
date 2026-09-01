# PROGRESS.md

## Day 1 — [date] — PASS
Benchmark: valid-login rewrite closed-book in 14:30, 0 hints (2 self-debugged failures).
Write-up gaps (quiz these Day 2): getByLabel/Placeholder/Text/TestId + priority order · auto-waiting definition · "timeout + waiting-for-locator" = locator matches nothing · accessible name source (value attr for input buttons; not HTML name attr) · regex .* and /i · projects=cross-browser, workers=parallel.

## Weak list
- `npm init playwright@latest` (failed 2x on Day 1; needs 2 clean passes to exit)

## Day 2 quiz preview
1. Exact Playwright install command.
2. Locator priority order (role > ? > ? > ?) and WHY role is first.
3. Write from memory: beforeEach block with an awaited goto.
4. You run 1 test and terminal says "3 passed" — explain. What does "workers" mean?
5. Define a flaky test + name 3 causes.

## Parked topics
- Deeper regex patterns (only .* and /i are in scope)
