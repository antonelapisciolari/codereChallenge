import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { invalidUser, validUser } from '../utils/userData';
import { homeTitle, loginEmptyCredentailsErrorMessage, loginInvalidCredentialsErrorMessage } from '../utils/pageTexts';

test.describe('Login -', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    //Go to Codere home page
    await homePage.goto();  
    
    await expect(page).toHaveTitle(homeTitle);
    //accept cookies and go to login
    await homePage.acceptCookiesAndGoToLogin();
  });
  
  //pending credentials! 
  test.skip('user should login successfully', async ({ page }) => {
    //here is an example of try catch, playwright already has an error handling very powerfull 
    //so I dont think it's totally necessary unless we want to implement custom error logic
    //we can enhace the reports by enabling the video, trace and screenshots on the playwright.config.ts 
    try {
      const loginPage = new LoginPage(page);
      await expect(loginPage.pageModal).toBeVisible();
      await loginPage.loginUser(validUser.email, validUser.password);
      await expect(page).toHaveTitle("Login succesfully")
      } catch (error) {
        console.error('Test failed with error:', error);
      }
  });
  
  test('should show error when using empty strings in login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.pageModal).toBeVisible();
    await loginPage.loginUser('', '');
    await expect(page.getByText('Revisa que todos los campos estén rellenos')).toBeVisible();
  });
  
  test('should show error when using invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.pageModal).toBeVisible();
    await loginPage.loginUser(invalidUser.email, invalidUser.password);
    await expect(page.getByText(loginInvalidCredentialsErrorMessage)).toBeVisible();
  });
  
  test('should show error when using only username to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.pageModal).toBeVisible();
    const username = "testing@gmail.com";
    await loginPage.loginUser(username, '');
    await expect(page.getByText(loginEmptyCredentailsErrorMessage)).toBeVisible();
  });
  
  test('should show error when using only password to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.pageModal).toBeVisible();
    const password = "password";
    await loginPage.loginUser('', password);
    await expect(page.getByText(loginEmptyCredentailsErrorMessage)).toBeVisible();
  });
});
