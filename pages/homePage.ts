import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly accessButton: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accessButton = page.getByRole('button', { name: 'Acceder ' });
        this.acceptCookiesButton = page.getByRole('button', { name: 'Aceptar ' });
    }
    async goto() {
        await this.page.goto('/');
    }
    async acceptCookiesAndGoToLogin() {
        await this.acceptCookiesButton.click();
        await this.accessButton.click();
    }
};