
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cors = require('cors')
const stripe = require("stripe")('sk_test_51KMwPjLgSmh25U1p0lZ3c6JfPWc1ghhwudHIUaqOGtvGzL8dCygWRTCD93apIINgN0xKZQtllS3QC2sIwFFUsNdu004KbPXRhx')
app.use(cors());
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/create-payment-intent", async (req, res) => {

    const { price } = req.body;
    console.log(price);
  
  
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount:  price * 100,
      automatic_payment_methods: {
  
        enabled: true,
  
      },
  
    });
  
  
    res.json({
  
      clientSecret: paymentIntent.client_secret,
  
    });
  
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
