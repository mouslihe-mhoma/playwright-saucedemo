import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async ouvrir() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async seConnecter(user: string, password: string) {
        await this.page.getByPlaceholder('Username').fill(user);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
}