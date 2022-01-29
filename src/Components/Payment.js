import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import { LoggedInContex } from '../App';
import CheckoutForm from './CheckoutForm';
import './Payment.css'
const Payment = () => {
    const demoPayment = 40;
    const [loginUser, setLoginUser] = useContext(LoggedInContex);
    const stripePromise = loadStripe('pk_test_51KMwPjLgSmh25U1pEEYLzkk79zJXyFaDioMCEP2Tk6A529q6ACHnupRRnbfMZxefxPgYZXXMvtq47hHWGX86CwYs00Ms0iSHqd')
    return (
        <div className='payment_container'>
            <div>
            <h3>This is Demo Payment</h3> <br />
            <h4>Please Pay${demoPayment}</h4> <br />
            <Elements stripe={stripePromise}> <br />
                <CheckoutForm price={demoPayment} />
            </Elements>
            </div>
        </div>
    );
};

export default Payment;