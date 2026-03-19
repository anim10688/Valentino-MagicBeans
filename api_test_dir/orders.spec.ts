import {test, expect} from '@playwright/test'

const orderPayload = {
    "customerDetails": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "address": "1234 Main St.",
        "city": "Rhyolite",
        "zipCode": "89003",
        "country": "United States"
    },
    "items": [
        {
            "productId": "504",
            "quantity": 1
        }
    ]
}

test('post order', async({request}) =>{
    const response = await request.post('/orders',{
        data: orderPayload
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log(responseBody);
})