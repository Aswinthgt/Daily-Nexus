"use client"

import {useState} from "react";
import { Fragment } from "react";


export default function LoginComponent() {

  const [email, setEmail] = useState('');
  const [password,setPassword] =useState('');

  function onSubmit(){
     console.log({
      email: email,
      Password: password
     })
  }

  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-2xl bg-blue-500 rounded py-1 text-black text-center mb-6">Login</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(event)=>{setEmail(event?.target.value)}}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event)=>{setPassword(event?.target.value)}}
              />
            </div>
            <div className="flex items-center justify-between">
              <button onClick={onSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs mt-5">
            &copy; 2023 Information && intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
