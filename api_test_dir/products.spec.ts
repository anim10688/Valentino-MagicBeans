import {test, expect} from '@playwright/test'

test('get products and validate', async({request}) =>{
	const response = await request.get('/products');
	const responseBody = await response.json();
    console.log(responseBody)
	
	expect(response.status()).toBe(200);
	
	
	expect(response.headers()['content-type']).toBe('application/json');

	expect(responseBody).toHaveProperty('success', true);
	expect(responseBody).toHaveProperty('data');
	expect(Array.isArray(responseBody.data)).toBeTruthy();
	expect(responseBody.data.length).toBeGreaterThan(0);
	expect(5).toEqual(5);
})