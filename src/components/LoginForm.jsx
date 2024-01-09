import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');





  const handleLogin = () => {
    onLogin();
  };

  return (
    <>











      <div className="bg-gray-100 p-6 rounded shadow-md">

        <div className='text-center'>
          <h1 className='text-xl'>Email:  abc@gmail.com </h1>
          <h1 className='text-xl'>Password: password</h1>
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}




          className="w-full p-2 mb-4 mt-5"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}



          className="w-full p-2 mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>

    </>
  );


};

export default LoginForm;
