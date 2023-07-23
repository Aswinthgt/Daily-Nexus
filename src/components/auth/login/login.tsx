"use client";

import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Login } from "./model";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import loader from "@/store/loader";
import Image from "next/image";
import "./login.css"

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<Login>>();
  const routerparam = useSearchParams();
  const params = routerparam.get("message");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (params) {
      toast.success(params);
    }
  }, [params]);

  function onSubmit() {
    const loginData: Login = {
      email: email,
      password: password,
    };

    const errors = validationFn();

    if (Object.keys(errors).length === 0) {
      Loginsave(loginData);
    } else {
      setErrors(errors);
    }
  }

  async function Loginsave(loginData: Login) {
    try {
      dispatch(loader.loader({ loader: true }));
      const response = await axios.post("../api/auth/login", loginData);
      toast.success(response.data.message);
      router.push("/dashboard");
    } catch (er) {
      toast.error(
        (er as any)?.response?.data.message
          ? (er as any).response.data.message
          : (er as any)?.message
      );
    } finally {
      dispatch(loader.loader({ loader: false }));
    }
  }

  function validationFn() {
    let error: Partial<Login> = {};

    if (
      !email.includes("@") &&
      !email.includes(".") &&
      email.trim().length < 5
    ) {
      error.email = "Email Invalid";
    }
    if (password.trim().length < 8) {
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
                Login
              </h2>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`border-2 ${
                  errors?.email ? "border-rose-300" : "border-sky-200"
                } w-full focus:outline-none rounded px-3 py-2 focus:border-sky-500`}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(event) => {
                  setEmail(event?.target.value);
                }}
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
                className={`border-2 ${
                  errors?.password ? "border-rose-300" : "border-sky-200"
                } w-full focus:outline-none rounded px-3 py-2 focus:border-sky-500`}
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event?.target.value);
                }}
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
                Sign In
              </button>
              {/* <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a> */}
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
