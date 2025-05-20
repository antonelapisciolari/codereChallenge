import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { invalidUser, validUser } from '../utils/testCredentials';
import { bienvenidoTitle, correctLoginMessage, errorTitle, homeTitle, loginEmptyCredentailsErrorMessage, loginInvalidCredentialsErrorMessage, loginTitle, reviewDataMessage } from '../utils/pageTexts';
import { AlertPage } from '../pages/alertPage';
import { TopMenu } from '../pages/topMenu';

test.describe('Login -', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    //Go to Codere home page
    await homePage.goto();  
    
    await expect(page).toHaveTitle(homeTitle);
    //accept cookies and go to login
    await homePage.acceptCookiesAndGoToLogin();
  });
  
  test('user should login successfully', async ({ page }) => {
    //here is an example of try catch, playwright already has an error handling very powerfull 
    //so I dont think it's necessary unless we want to implement custom error logic
    //we can enhace the reports by enabling the video, trace and screenshots on the playwright.config.ts 
    try {
      const loginPage = new LoginPage(page);
      await expect(loginPage.pageModal).toBeVisible();
      await loginPage.loginUser(validUser.email, validUser.password);
      const alertModal = new AlertPage(page);
      await expect(alertModal.alertTitle).toBeVisible();
      await expect(alertModal.alertTitle).toContainText(bienvenidoTitle);
      await expect(alertModal.alertMessage).toContainText(correctLoginMessage);
      await alertModal.okButton.click();
      const topMenu = new TopMenu(page);
      //validate that the user is logged. We can improve this.
      await expect(topMenu.profileSection).toBeVisible();
      } catch (error) {
        console.error('Test failed with error:', error);
        throw error;
      }
  });
  
  test('should show error when using empty strings in login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.pageModal).toBeVisible();
    await loginPage.loginUser('', '');
    const alertModal = new AlertPage(page);
    await expect(alertModal.alertTitle).toContainText(loginTitle);
    await expect(alertModal.alertMessage).toContainText(reviewDataMessage);
  });
  
  test('should show error when using invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.pageModal).toBeVisible();
    await loginPage.loginUser(invalidUser.email, invalidUser.password);
    const alertModal = new AlertPage(page);
    await expect(alertModal.alertTitle).toContainText(errorTitle);
    await expect(alertModal.alertMessage).toContainText(loginInvalidCredentialsErrorMessage);
  });
  
  test('should show error when using only username to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.pageModal).toBeVisible();
    const username = "testing@gmail.com";
    await loginPage.loginUser(username, '');
    const alertModal = new AlertPage(page);
    await expect(alertModal.alertTitle).toContainText(loginTitle);
    await expect(alertModal.alertMessage).toContainText(loginEmptyCredentailsErrorMessage);
  });
  
  test('should show error when using only password to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.pageModal).toBeVisible();
    const password = "password";
    await loginPage.loginUser('', password);
    const alertModal = new AlertPage(page);
    await expect(alertModal.alertTitle).toContainText(loginTitle);
    await expect(alertModal.alertMessage).toContainText(loginEmptyCredentailsErrorMessage);
  });
});
