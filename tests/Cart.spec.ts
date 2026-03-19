import {test, expect} from '@playwright/test';
import * as products from './pages/Products';
import * as cart from './pages/Cart';
import * as checkout from './pages/Checkout';
import * as contact from './pages/Contact';

test('Add Items to the cart', async ( { page }) =>{
    await page.goto('');

    const addedProduct = await products.addProductsToCart(page, 0);
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
    await cart.assertProduct(page, addedProduct.name!);

    const cartProductPrice = await cart.subTotal(page);
    expect(cartProductPrice).toEqual(addedProduct.price);
});

test('Complete workflow', async ({ page }) => {

    await page.goto('');

    const addedProduct = await products.addProductsToCart(page, 0);

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    await checkout.addContactInfo(page);
    await checkout.addShippingAddress(page);
    await checkout.addPaymentInfo(page);
    await checkout.placeOrder(page);

    const orderID = await page.getByText('Your Order ID is:').locator('..').locator("//*[contains(@class, 'font-mono font-bold')]").textContent();

    await page.getByRole('button', {name : 'Track Your Order'}).click();

    await contact.fillOrderIdAndEmail(page, orderID!, checkout.testValues.email);
    await contact.clickTrackOrder(page);
})

test('Complete workflow - with steps', async ({ page }) => {

    await page.goto('');

    let addedProduct: any;
    await test.step('Add Products to cart0', async () =>{
         addedProduct = await products.addProductsToCart(page, 0);
    })

    await test.step('Go TO Checkout Page', async () =>{
        await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    })

    await test.step('Add checkout information', async () => {
        await checkout.addContactInfo(page);
        await checkout.addShippingAddress(page);
        await checkout.addPaymentInfo(page);
        await checkout.placeOrder(page);
    })


    let orderID: string | null;
    await test.step('Get Order ID', async () => {
        orderID = await page.getByText('Your Order ID is:').locator('..').locator("//*[contains(@class, 'font-mono font-bold')]").textContent();
    })


    await test.step('Fill Track/Contact Page info', async () => {
        await page.getByRole('button', { name: 'Track Your Order' }).click();

        await contact.fillOrderIdAndEmail(page, orderID!, checkout.testValues.email);
        await contact.clickTrackOrder(page);
    })


    await test.step('check if ordered item is returned', async () => {
        const orderedItem = await page.getByText(addedProduct.name!);
        await expect(orderedItem).toBeVisible();
    })

})

