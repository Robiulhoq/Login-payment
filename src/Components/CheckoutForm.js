import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import './Payment.css'




const CheckoutForm = ({ price }) => {
    const history = useHistory()
    const stripe = useStripe();
    const elements = useElements();
    const [errorMassage, setErrorMassage] = useState('');
    const [success, setSuccess] = useState({});
    console.log(success);
    const [clientSerict, setClientSerict] = useState('')
    useEffect(() => {
        fetch('https://nameless-everglades-93524.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSerict(data.clientSecret))
    }, [price])
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setErrorMassage(error.message);
            setSuccess('')
        } else {
            setErrorMassage('')
            console.log(paymentMethod);
        }

        stripe
            .confirmCardPayment(clientSerict, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: 'Jenny Rosen',
                    },
                },
            })
            .then(function (result) {
                setSuccess(result.paymentIntent)
            });

    };

    return (
        <div>
            <div>
                <h4>Card information for check</h4>
                <p>Card number: 4242424242424242</p>
                <p>Expire date: Any future date</p>
                <p>cvc:  Any 3 digits</p>
                <p>Zip:  5 digits</p>
                <br />
                <br />
            </div>
            <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        
                        base: {
                            fontSize: '16px',

                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='pay_btn' type="submit" disabled={!stripe}>
                Pay
            </button>
            {
                errorMassage.length ? <p>{errorMassage}</p> : null
            }
            {
                success ? <div>
                    <h3>Your Payment $: {success.amount / 100} is completd</h3>
                    <h4>Yor transaction id: {success.created}</h4>
                    <p>Status: {success.status}</p>
                    
                </div> : null
            }
        </form>
        </div>
    );
};
export default CheckoutForm