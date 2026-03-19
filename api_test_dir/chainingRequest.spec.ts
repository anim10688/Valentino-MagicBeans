import {test, expect} from '@playwright/test'

test('get products and validate', async({request}) =>{
    const getResponse = await request.get('/products');
    const responseBody = await getResponse.json();

    const products = responseBody.data;
    const availableProduct = products.find((product:any)=>{
        return product.stock > 0;
    });
    console.log(availableProduct.id);

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
            "productId": availableProduct.id,
            "quantity": 1
        }
    ]
}

const response = await request.post('/orders',{
        data: orderPayload
    });

    expect(response.status()).toBe(201);


})