"use client";

import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Login } from "./model";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import loader from "@/store/loader";




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
      toast.success(params, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
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
      const response = await axios.post(
        "../api/auth/login",
        loginData
      );
      if (response.statusText === "OK") {
        dispatch(loader.loader({ loader: false }));
        router.push("../dashboard")
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (er) {
      dispatch(loader.loader({ loader: false }));
      router.push("/auth/login")
      toast.warning((er as any)?.data?.message ?  (er as any).data.message :   (er as any)?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }



  function validationFn() {
    let error: Partial<Login> = {};

    if (!email.includes("@") && !email.includes(".") && email.trim().length < 5) {
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
            <h2 className="text-2xl bg-blue-500 rounded py-1 text-black text-center mb-6">
              Login
            </h2>
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
                placeholder="Enter your Email"
                value={email}
                onChange={(event) => {
                  setEmail(event?.target.value);
                }}
              />
              {errors?.email && (
                <p className="text-red-400 italic">{errors.email}</p>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <p className="text-red-400 italic">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={onSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
