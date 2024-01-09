import React, { useState, useEffect } from 'react';


import CardContainer from './components/CardContainer';
import LoginForm from './components/LoginForm';
import toast, { Toaster } from 'react-pop-toast';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(userLoggedIn);
  }, []);

  const handleLogin = async () => {
    try {
      const promise = new Promise((resolve, reject) => {
        fetch('https://netflix-clone-apis.vercel.app/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'abc@gmail.com',
            password: 'password',
          }),
        })
          .then((response) => {
            if (response.ok) {
              setLoggedIn(true);
              localStorage.setItem('isLoggedIn', 'true');
              resolve();
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
            return <b>Login failed!</b>;
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
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
