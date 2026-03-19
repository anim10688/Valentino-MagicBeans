import {type Page, type Locator, expect} from '@playwright/test';

export async function addProductsToCart(page: Page, index: number) {
    const productWrapper = await page.locator("//div[@class='p-6']").nth(index);
    const productName = await productWrapper.locator("//*[contains(@class,'font-serif font-semibold')]").first().textContent();
    const productPrice = await productWrapper.locator("//*[contains(@class, 'font-bold')]").textContent();

    const addtoCartButton = await productWrapper.getByRole( 'button', {name: 'Add to cart'} ); 
    await addtoCartButton.click();

    return {
        name: productName,
        price: Number(productPrice!.substring(1))
    }
}