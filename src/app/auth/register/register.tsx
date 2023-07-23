"use client";

import { Fragment, useState } from "react";
import { Register, Show } from "./model";
import Image from "next/image";

export default function RegisterComponent({ registerData }: Show) {
  const [register, setRegister] = useState<Register>({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Register>>();

  function setRegisterValue(event: any) {
    const { name, value } = event.target;
    setRegister((preval) => ({
      ...preval,
      [name]: value,
    }));
  }

  function onSubmit() {
    const errors = validationFn();

    if (Object.keys(errors).length === 0) {
      registerData(register);
    } else {
      setErrors(errors);
    }
  }

  function validationFn() {
    let error: Partial<Register> = {};
    if (register.userName.trim().length <= 2) {
      error.userName = "User Name Invalid";
    }

    if (
      !register.email.includes("@") &&
      !register.email.includes(".") &&
      register.email.trim().length < 5
    ) {
      error.email = "Email Invalid";
    }

    if (register.password.trim().length < 8) {
      error.password = "Password length must be 8 character";
    }
    return error;
  }

  return (
    <Fragment>
      <div className="flex justify-center items-center mt-20">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 py-6">
          <div className="flex justify-center items-center mb-4">
              <div className="bg-blue-200 p-0.8 rounded-l-[25px] pe-3">
                <Image
                  src="/assets/mainlogo.png"
                  alt="Logo"
                  width={56}
                  height={100}
                />
              </div>

              <h2 className="bg-blue-200 p-3 pe-10 rounded-r-[25px] text-2xl font-tektur">
                Register
              </h2>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`border-2 ${errors?.userName ?'border-rose-300' : 'border-sky-200'} w-full focus:outline-none rounded px-3 py-2 focus:border-sky-500`}
                id="username"
                type="text"
                name="userName"
                placeholder="Enter your username"
                value={register.userName}
                onChange={setRegisterValue}
              />
              {errors?.userName && (
                <p className="text-rose-300 text-sm">{errors.userName}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`border-2 ${errors?.email ?'border-rose-300' : 'border-sky-200'} w-full focus:outline-none rounded px-3 py-2 focus:border-sky-500`}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={register.email}
                onChange={setRegisterValue}
              />
              {errors?.email && (
                <p className="text-rose-300 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`border-2 ${errors?.password ?'border-rose-300' : 'border-sky-200'} w-full focus:outline-none rounded px-3 py-2 focus:border-sky-500`}
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={register.password}
                onChange={setRegisterValue}
              />
              {errors?.password && (
                <p className="text-rose-300 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={onSubmit}
                className="bg-blue-500 hover:bg-blue-100 hover:outline hover:outline-offset-2 hover:outline-blue-500 hover:text-blue-500 text-white font-bold py-2 px-4 rounded focus:bg-blue-500 focus:text-white"
                type="button"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs mt-5">
            &copy; 2023 Information and Intelligence. All rights reserved.

          </p>
        </div>
      </div>
    </Fragment>
  );
}
