import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly inventoryItems: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.inventoryItems = page.locator('.inventory_item');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async addProduct(productName: string): Promise<void> {
        const inventoryItem = this.inventoryItems.filter({ hasText: productName });
        const addToCartButton = inventoryItem.getByRole('button', { name: 'Add to cart' });
        await addToCartButton.click();
    }

    async expectCartCount(count: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(count.toString());
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}