import {type Page, expect} from '@playwright/test';

export async function assertProduct(page: Page, heading: string) {
    const cartProductHeading = await page.getByRole('heading', 
        {
            name: heading
        }
    )
    await expect(cartProductHeading).toBeVisible();
}

export async function subTotal(page: Page){
    const cartProductPrice = await page.getByText('Subtotal').locator('..').locator("//*[contains(@class, 'font-semibold')]").textContent();
    const cartProductPriceNumber = Number(cartProductPrice!.replace('$', ''));

    return cartProductPriceNumber;
}