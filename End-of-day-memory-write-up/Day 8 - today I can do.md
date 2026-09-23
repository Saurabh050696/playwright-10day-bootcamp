## SQL query clause order and the basic SELECT pattern

```sql
SELECT columns
FROM table
WHERE row_condition
GROUP BY grouping_columns
HAVING group_condition
ORDER BY sort_column ASC/DESC
LIMIT number;
```

- Not every query uses every clause. WHERE filters rows, GROUP BY creates groups, HAVING filters groups, ORDER BY sorts the final result, and LIMIT restricts the number of returned rows.
- `*` means all columns, while `SELECT name, email` returns only the named columns.

```sql
SELECT * FROM users;
```

```sql
SELECT name, email
FROM users
WHERE status = 'active';
```

```sql
SELECT name, email
FROM users
WHERE status = 'active'
ORDER BY name ASC
LIMIT 2;
```

## filtering operators and LIKE wildcards

```text
=       equals
>       greater than
<       less than
>=      greater than or equal to
<=      less than or equal to
AND     both conditions must be true
OR      at least one condition must be true
IN      matches one value from a listed set
BETWEEN inclusive range
LIKE    pattern matching
```

```sql
SELECT *
FROM users
WHERE country = 'India'
  AND status = 'active';
```

```sql
SELECT *
FROM users
WHERE country IN ('India', 'UK');
```

```sql
SELECT *
FROM orders
WHERE amount BETWEEN 80 AND 200;
```

- BETWEEN includes both endpoints.

```text
'A%'           starts with A
'%example%'    contains example
'%example.com' ends with example.com
'%com'         ends with com
'A_'           A followed by exactly one character
```

```sql
SELECT name, email
FROM users
WHERE name LIKE 'A%';
```

- Text values use quotes, such as `'India'` and `'active'`; numeric values generally do not, such as `amount > 100`.

## sorting, limiting, and distinct results

- ORDER BY sorts the returned rows.
- ASC means ascending and is the default in many databases.
- DESC means descending.
- LIMIT restricts the number of rows returned.
- DISTINCT removes duplicate values from the selected result.

```sql
SELECT *
FROM orders
ORDER BY amount DESC
LIMIT 2;
```

- This means: return the two most expensive orders.

```sql
SELECT DISTINCT country
FROM users;
```

- This returns each country represented in the table once.

```sql
SELECT *
FROM users
WHERE status = 'active'
ORDER BY name DESC
LIMIT 2;
```

- LIMIT should come after ORDER BY, not before ORDER BY.

## aggregate functions

- COUNT(*) counts rows.
- SUM(column) adds numeric values.
- AVG(column) calculates the average.
- MAX(column) returns the largest value.
- MIN(column) returns the smallest value.

General pattern:

```sql
SELECT aggregate_function(column)
FROM table
WHERE optional_row_condition;
```

```sql
SELECT COUNT(*) AS user_count
FROM users;
```

```sql
SELECT SUM(amount) AS total_amount
FROM orders;
```

```sql
SELECT AVG(amount) AS average_amount
FROM orders;
```

```sql
SELECT MAX(amount) AS highest_amount
FROM orders;
```

```sql
SELECT MIN(amount) AS lowest_amount
FROM orders;
```

- An aggregate applies to the rows that remain after WHERE filtering.

```sql
SELECT SUM(amount) AS paid_total
FROM orders
WHERE status = 'paid';
```

- This totals only paid orders, not every order.

## aliases

- AS gives a selected column or calculated result a temporary readable name. It does not rename the actual database column.

```sql
SELECT COUNT(*) AS user_count
FROM users;
```

```sql
SELECT SUM(amount) AS total_amount
FROM orders;
```

- Aliases should describe the result. For example, `order_count` is clearer than `user_name` when the value is a count.

## GROUP BY and HAVING

- GROUP BY puts rows with the same value into groups so that an aggregate can be calculated for each group.

```sql
SELECT country, COUNT(*) AS user_count
FROM users
GROUP BY country;
```

- This returns one row per country and counts the users in each country.

```sql
SELECT status, SUM(amount) AS total_amount
FROM orders
GROUP BY status;
```

- This returns one row per order status and calculates the total amount for each status.

- HAVING filters groups after GROUP BY and aggregation. It is used for conditions involving aggregate results.

```sql
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 2;
```

- This groups orders by user, counts each user's orders, and keeps only users with at least two orders.

## WHERE versus HAVING

- WHERE filters individual rows using condition such as pending orders (`status = 'pending'`) or active users (`status = 'active'`), whereas HAVING filters the groups after they are grouped/aggregated.
- WHERE cannot normally filter an aggregate such as COUNT(*) because aggregation has not happened yet; that condition belongs in HAVING.
- WHERE filters individual order rows before grouping.
- HAVING filters the groups after counting.

```sql
SELECT *
FROM orders
WHERE status = 'paid';
```

```sql
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 2;
```

- The processing idea is:

```text
WHERE → GROUP BY → aggregate calculation → HAVING
```

- Do not say that HAVING filters individual rows after grouping. It filters groups.

## INNER JOIN and LEFT JOIN

- INNER JOIN returns only the combinations of rows that have a matching value in both tables.
- LEFT JOIN preserves every row from the left table. If there is no matching right-side row, the right-side columns are NULL.

```sql
SELECT orders.id, users.name, orders.amount
FROM orders
INNER JOIN users
  ON orders.user_id = users.id;
```

```sql
SELECT users.name, orders.id AS order_id
FROM users
LEFT JOIN orders
  ON users.id = orders.user_id;
```

- Starting from users with LEFT JOIN orders allows me to find users who have no orders. Those users have NULL in the order columns.

```sql
SELECT users.name
FROM users
LEFT JOIN orders
  ON users.id = orders.user_id
WHERE orders.id IS NULL;
```

- I would use LEFT JOIN to identify or get those users who have never placed an order.

## ON conditions

- ON defines how rows from the two tables are related during a JOIN. It specifies the matching condition.
- For our schema, the relationship is:

```text
users.id = orders.user_id
```

Complete example:

```sql
FROM users
LEFT JOIN orders
  ON users.id = orders.user_id
```

- ON establishes the table relationship. WHERE filters the rows after the join result is formed.

```sql
SELECT users.name, orders.id
FROM users
INNER JOIN orders
  ON users.id = orders.user_id
WHERE users.status = 'active'
  AND orders.status = 'paid';
```

## COUNT(*) versus COUNT(orders.id) with a LEFT JOIN

- With a LEFT JOIN, a user with no orders is still preserved as one joined result row, but the right-side order columns are NULL.    COUNT(*) counts that preserved row and returns 1 for a user with zero orders, which is incorrect when the result is intended to be an order count. COUNT(orders.id) counts only non-NULL order IDs, so it correctly returns 0 for a user with no orders.

```sql
SELECT users.name, COUNT(orders.id) AS order_count
FROM users
LEFT JOIN orders
  ON users.id = orders.user_id
GROUP BY users.id, users.name;
```

For a user with no orders:

```text
Divya | NULL before counting
COUNT(*)         → 1
COUNT(orders.id) → 0
```

- LEFT JOIN is what preserves Divya; COUNT(orders.id) is what measures her order count correctly.

## duplicate-finding queries

```sql
SELECT email, COUNT(*) AS email_count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

- GROUP BY puts identical email values into groups. COUNT(*) counts the rows in each email group. HAVING COUNT(*) > 1 keeps only duplicate email groups.
- To find duplicates, group by the suspected duplicate column and use HAVING with COUNT(*) > 1.

## COALESCE

- COALESCE(value, fallback) replaces NULL with a fallback value.

```sql
SELECT users.name,
       COALESCE(SUM(orders.amount), 0) AS total_amount
FROM users
LEFT JOIN orders
  ON users.id = orders.user_id
GROUP BY users.id, users.name;
```

- This displays `0` instead of `NULL` for a user with no orders.

## total amount per user

```sql
SELECT users.name,
       SUM(orders.amount) AS total_amount
FROM users
LEFT JOIN orders
  ON users.id = orders.user_id
GROUP BY users.id, users.name;
```

- The JOIN establishes the user-order relationship, SUM calculates the amount, and GROUP BY produces one result per user.

## database validation

- Database validation checks whether an operation performed through the UI is correctly reflected in the database.
- Example: If a user performs a registration operation on the UI of a certain website, I would verify it as a tester by querying the database to check if that user is really getting added in the registered users.
- After a user registers through the UI, I would query the users table using the registered email and verify that the row exists with the expected name, email, and account status.
- In a real project, this can be done through a database client or a database library integrated with the test framework.
