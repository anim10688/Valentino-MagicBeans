import { resolve } from 'path';
import fs from 'fs';
import { test } from '@playwright/test';
import * as loginPage from '../pages/Login'

const authSessionFile = resolve(__dirname, '../../playwright/.auth/user.json');

// Read and parse the JSON file
const loginDataFile = resolve(__dirname, '../../playwright/.auth/loginData.json');
const loginData = JSON.parse(fs.readFileSync(loginDataFile, 'utf-8')) as {
    email: string,
    password: string
}

test('authenticate', async ({ page }) => { 
    await page.goto('/login')

    await loginPage.login(
        page,
        loginData.email,
        loginData.password
    )
    await loginPage.verifySuccessfulLogin(page)

    await page.context().storageState({
        path: authSessionFile
    })
  
})