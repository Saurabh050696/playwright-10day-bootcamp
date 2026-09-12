import { expect, test } from '@playwright/test';
import { users } from '../testData';
import { LoginPage } from '../pages/LoginPage';

test.describe('closed-book test writing using for loop', () => {

    test.beforeEach('navigation', async ({ page }) => {
        await page.goto('/');
    });

    for (const eachUser of users) {
    test(`${eachUser.username} ${eachUser.tag}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(eachUser.username, eachUser.password);
        if (eachUser.isLocked) {
            await expect(page.getByRole('alert')).toContainText('Epic sadface: Sorry, this user has been locked out.');
        } else {
            await expect(page).toHaveURL(/inventory/i);
        }

    });
}
});