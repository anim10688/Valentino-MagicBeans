import {test} from '@playwright/test';
import {EmailUtils} from './utils/EmailUtils';
import * as signUpPage from './pages/Signup';
import * as loginPage from './pages/Login';
import { join, resolve } from 'path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'

const testSignup = process.env.testSignup;

test('Sign Up', async ({page}) => {
    test.skip(!testSignup, 'Skipping sign up test');
    const emailUtils = new EmailUtils();
    const inbox = await emailUtils.createInbox();
    console.log(inbox);
    await page.goto('/signup');
    await signUpPage.signUp(page, inbox.emailAddress!);

    const email = await emailUtils.waitForLatestEmail(inbox.id!);
    console.log(email);
    const confirmationCode = email.body!.match(/(\d{6})/)![0];

    await signUpPage.addConfirmationCode(page, confirmationCode);

    await loginPage.login(page, inbox.emailAddress!, signUpPage.signUpData.pass);

    await loginPage.verifySuccessfulLogin(page)

    // persist login data:
    const loginData = {
        email: inbox.emailAddress,
        pass: signUpPage.signUpData.pass
    }
    const authDir = resolve(__dirname, '../playwright/.auth');
    if (!existsSync(authDir)) {
        mkdirSync(authDir, { recursive: true });
    }
    writeFileSync(
        join(authDir, 'loginData.json'),
        JSON.stringify(loginData, null, 2)
    );
});



