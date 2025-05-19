import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly pageModal: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageModal = page.locator('codere-new-login')
        this.userName = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Acceder' });
    }
    async loginUser(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
};