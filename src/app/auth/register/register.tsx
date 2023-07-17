"use client"

import { Fragment } from "react";
import {useState} from "react";


export default function RegisterComponent() {

  const [register, setRegister] = useState({
    userName: '',
    email:'',
    password:''
  });

  function setRegisterValue(event:any){
    const {name , value} = event.target
        setRegister((preval)=>({
         ...preval,
         [name] : value
        }))
  }

  function onSubmit(){
      console.log(register)
  }

  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-2xl bg-blue-500 rounded py-1 text-black text-center mb-6">Register</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="userName"
                placeholder="Enter your username"
                value={register.userName}
                onChange={setRegisterValue}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={register.email}
                onChange={setRegisterValue}
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
                value={register.password}
                onChange={setRegisterValue}
              />
            </div>
            <div className="flex items-center justify-between">
              <button onClick={onSubmit}
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs mt-5">
            &copy; 2023 My Website. All rights reserved.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
