"use client";

import { Fragment, useState } from "react";
import RegisterComponent from "./register";
import VerifyEmail from "./verifyEmail";
import { Register } from "./model";
import loader from "@/store/loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Register() {
  const [showEmail, setShowEmail] = useState(false);
  const [message,setMessage] = useState('check your mail')

  function sendData(register: Register, value: boolean) {
    registerSave(register);
  }

  const dispatch = useDispatch();
  const router = useRouter();

  async function registerSave(registerdata: Register) {
    try {
      dispatch(loader.loader({ loader: true }));
      const response = await axios.post(
        "../api/auth/register",
        registerdata
      );
      if (response.statusText === "OK") {
        dispatch(loader.loader({ loader: false }));
        setMessage(response.data.message)
        setShowEmail(true);
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

  return (
    <Fragment>
      {!showEmail && <RegisterComponent registerData={sendData} />}
      {showEmail && <VerifyEmail  message={message}/>}
    </Fragment>
  );
}
