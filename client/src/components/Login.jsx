import React, { useState } from "react";
import axios from "../requests/axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log(email, password);
      const apiUrl = "/login";
      const requestData = {
        username: email,

        password,
      };

      const response = await axios.post(apiUrl, requestData);

      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-full h-screen bg-primary-background">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-primary-background px-10 py-20 rounded-3xl border-gray-200">
          <h1 className="text-5xl font-semibold text-primary-dark">
            Welcome {isLogin ? "Back" : "New User"}
          </h1>
          <p className="font-medium text-primary-dark text-lg  mt-4">
            {isLogin
              ? "Welcome back! Please sign in."
              : "Join us today! Create an account."}
          </p>
          <div className="mt-8">
            <label className="text-lg font-medium text-primary-dark">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full bottom-2 border border-gray-500 rounded-xl p-4 mt-1 bg-transparent"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mt-8">
            <label className="text-lg font-medium text-primary-dark">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bottom-2 rounded-xl p-4 mt-1 bg-transparent border border-gray-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 font-medium text-base" htmlFor="remember">
                Remember for 30 days
              </label>
            </div>
            {isLogin ? (
              <button className="ml-4 font-medium text-base text-primary-main">
                Forgot Password
              </button>
            ) : null}
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              onClick={handleLogin}
              className="active:scale-[.98] active:duration-75 hover:bg-primary-dark hover:scale-[1.02] ease-in-out transition-all py-3 rounded-xl bg-primary-light text-primary-background text-lg font-bold"
            >
              {isLogin ? "Sign in" : "Sign up"}
            </button>
            <button
              onClick={toggleCard}
              className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all py-3 rounded-xl border-2 border-gray-200"
            >
              {isLogin ? "Sign up" : "Back to Login"}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-secondary-main">
        <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-secondary-main to-primary-dark animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default Login;
