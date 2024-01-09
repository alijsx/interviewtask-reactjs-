import React, { useState, useEffect } from 'react';


import CardContainer from './components/CardContainer';
import LoginForm from './components/LoginForm';
import toast, { Toaster } from 'react-pop-toast';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(userLoggedIn);
  }, []);

  const handleLogin = async () => {


    
    try {
      const emailToLogin = 'abc@gmail.com'; 
      const promise = new Promise((resolve, reject) => {
        fetch('https://netflix-clone-apis.vercel.app/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((response) => {



            if (response.ok) {

              if (email === emailToLogin) {
                setLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                resolve();
              } else {
                console.error('Invalid email');
                reject();
              }
            } else {
              console.error('Login failed');
              reject();
            }
          })
          .catch((error) => {
            console.error('Login failed:', error);
            reject();
          });
      });



  
      toast.promise(
        promise,
        {
          loading: 'Logging in...',
          success: () => {
            return <b>Login successful!</b>;
          },
          error: () => {
            return <b>Unable to Login</b>;
          },
        }
      );
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster />
      {loggedIn ? (
        <div>
          <div className='flex justify-end'>
            <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={handleLogout}>Logout</button>
          </div>
          <CardContainer />
        </div>
      ) : (
        <LoginForm
        onLogin={handleLogin}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      )}
    </div>
  );
};

export default App;
