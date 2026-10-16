import { Page } from '@playwright/test';

export class InventoryPage {
    constructor(private page: Page) { }

    async ajouterAuPanier() {
        await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
    }

    async ouvrirPanier() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}
