import React from 'react'

const Login = () => {
  return (
    <div className="flex w-full h-screen">login
        <div className = "w-full flex items-center justify-center lg:w-1/2">
{/* form */}
        <h1>Wlcome Back</h1>
        <p>Welcome back! Please sign in.</p>
        <div>
            <div>
                <label>Email</label>
                <input></input>
            </div>
        </div>
        </div>
        <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
        <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin"> 
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10" >

            </div>
            </div>
        </div>
    </div>
  )
}

export default Login