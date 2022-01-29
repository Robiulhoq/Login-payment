import React, { useContext, useState } from 'react';
import './login.css';
import * as firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { LoggedInContex } from '../App';
import { useHistory } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);
const Login = () => {
  const [loginUser, setLoginUser] = useContext(LoggedInContex);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });
  const hendleValueChange = (e) => {
    const user = { ...userInfo };
    user[e.target.name] = e.target.value;
    setUserInfo(user)
  };
  const actionCodeSettings = {
    url: 'http://localhost:3000',
    handleCodeInApp: true,
  };
  const auth = getAuth();
  let history = useHistory();
  const hendleCreateAccount = () => {

    sendSignInLinkToEmail(auth, userInfo.email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', userInfo.email);
        alert('Chack Your Email')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  }
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        const { email } = result.user;
        console.log(email);
        setLoginUser({ email })
        history.replace('/payment')
        window.localStorage.removeItem('emailForSignIn');
      })
      .catch((error) => {
        setError(error.message)
      });
  }
  return (
    <div className='login_container'>
      {
          loginUser.length? <h3>Please Chack Your {loginUser.email} email for confirmation</h3>: null
      }
      <form action="">
       
            <div className='login_field'>
              <input name='email' onChange={hendleValueChange} type="email" placeholder='email' /> <br />
              <input className='login_btn' type="button" onClick={hendleCreateAccount} value="CREATE ACCOUNT" />
            </div>

      </form>
      {
        error? <h3>{error}</h3>: null
      }
    </div>
  );
};

export default Login;