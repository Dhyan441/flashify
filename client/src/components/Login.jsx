import React, { useState } from 'react';
import axios from '../requests/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toggleCard = () => {
    setIsLogin(!isLogin);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const apiUrl = '/login'; 
      const requestData = {
        username: email,
        password,
      };

      const response = await axios.post(apiUrl, requestData);
      console.log(response)
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data["token"])
        navigate('/app/upload')
      }else{
        alert("Invalid credentials")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className='bg-white px-10 py-20 rounded-3xl border-gray-200'>
          <h1 className='text-5xl font-semibold'>Welcome {isLogin ? 'Back' : 'New User'}</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>{isLogin ? 'Welcome back! Please sign in.' : 'Join us today! Create an account.'}</p>
          <div className="mt-8">
            <label className='text-lg font-medium'>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className='w-full bottom-2 border border-gray-500 rounded-xl p-4 mt-1 bg-transparent'
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mt-8">
            <label className='text-lg font-medium'>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className='w-full bottom-2 rounded-xl p-4 mt-1 bg-transparent border border-gray-500'
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='mt-8 flex justify-between items-center'>
            <div>
              <input type='checkbox' id="remember" />
              <label className="ml-2 font-medium text-base" htmlFor="remember">Remember for 30 days</label>
            </div>
            {isLogin ? (
              <button className='ml-4 font-medium text-base text-violet-500'>Forgot Password</button>
            ) : null}
          </div>
          <div className='mt-8 flex flex-col gap-y-4'>
              <button
              onClick={handleLogin} 
              className='active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
            <button
              onClick={toggleCard}
              className='active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all py-3 rounded-xl border-2 border-gray-200'
            >
              {isLogin ? 'Sign up' : 'Back to Login'}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
        <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default Login;
