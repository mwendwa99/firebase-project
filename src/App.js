import './App.css';
import React, { useState, useEffect } from 'react';
import fire from './firebase';
import Login from './Components/Login';
import Hero from './Components/Hero';

const App = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAcc, setHasAcc] = useState(false);

  // clear inputs
  const clearInput = () => {
    setEmail('');
    setPassword('');
  };

  // clear errors
  const clearError = () => {
    setEmailError('');
    setPasswordError('');
  }

  // handle login
  const handleLogin = () => {
    clearError();
    fire.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
        }
      })
  };

  // handle signup
  const handleSignup = () => {
    clearError();
    fire.auth().createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
        }
      })
  };

  // handle logout
  const handleLogout = () => {
    fire.auth().signOut();
  };

  // listerner to check whether user signup or login
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className='App'>

      {user ? (
        <Hero handleLogout={handleLogout} />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAcc={hasAcc}
          setHasAcc={setHasAcc}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  )
}

export default App
