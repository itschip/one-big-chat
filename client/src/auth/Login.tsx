import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { user, setUser } = useAuth();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('USER: ', data.user);

    if (data) {
      setUser(data.user);
      history.push('/chat');
      console.log(user);
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-40 rounded shadow-lg flex flex-col">
        <h1 className="text-white font-medium text-3xl text-center">
          One Big Chat
        </h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="Username"
          className="p-2 rounded mt-4 font-regular outline-none text-gray-500"
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Password"
          className="p-2 rounded mt-4 font-regular outline-none text-gray-500"
          type="password"
        />
        <button
          className="text-white p-2 rounded mt-4 bg-indigo-500 hover:bg-indigo-400 outline-none font-medium"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-white mt-3">
          Don't have an account?
          <span
            className="text-indigo-500 font-medium cursor-pointer"
            onClick={() => history.push('/signup')}
          >
            {' '}
            Sign up!
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
