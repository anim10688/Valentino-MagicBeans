import { test} from '@playwright/test';

test('API Intercept with mock response', async({page})=>{
    
    
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
})
