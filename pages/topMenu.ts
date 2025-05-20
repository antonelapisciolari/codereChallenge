import { type Locator, type Page } from '@playwright/test';

export class TopMenu {
    readonly page: Page;
    readonly profileSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileSection = page.locator('.loginOps')
    }
};