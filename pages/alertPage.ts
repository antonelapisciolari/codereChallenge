import { type Locator, type Page } from '@playwright/test';

export class AlertPage {
    readonly page: Page;
    readonly alertTitle: Locator;
    readonly alertMessage: Locator;
    readonly okButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alertTitle = page.locator('.alert-title');
        this.alertMessage = page.locator('.alert-message')
        this.okButton = page.getByRole('button', { name: 'OK ' });
    }
};