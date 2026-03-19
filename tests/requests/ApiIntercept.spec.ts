import {test} from '@playwright/test';

const someProducts = {
        success: true,
        source: 'dynamodb',
        data: [{
            name: 'Mocha coffee',
            price: 10.99,
            id: '0'
        },
        {
            name: 'Java cool',
            price: 5.99,
            id: '1'
        }
        ]
    }

test('API Intercept', async({page}) =>{
    
    page.on('request', (req) =>{
        console.log(req.url()+ " " + req.method());
    })
    await page.goto('/products');
    await page.waitForLoadState('networkidle')

})  

test('API Intercept with mock response', async({page})=>{
    page.route('https://api.valentinos-magic-beans.click/products', (rout) => {
        rout.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(someProducts)

        })
    })
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
})
