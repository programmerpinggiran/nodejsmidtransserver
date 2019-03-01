# nodejs midtrans server
node js simple server key for midtrans handle connection from mobile SDK, besause in PHP apache stuck in trailing slash redirect



it uses port 8001. change the server key with yours.

setup: npm install

run: node index.js

## Usage
load from SdkUIFlowBuilder.. .setMerchantBaseUrl('_MERCHANT_URL_HERE_')
```
localhost:8001/charge
```

The response of API will be printed/returned to client as is. Example response that will be printed

```
{
    "token": "413ae932-471d-4c41-bfb4-e558cc271dcc",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/413ae932-471d-4c41-bfb4-e558cc271dcc"
}
```



