"use client";

import { Fragment, useState } from "react";
import RegisterComponent from "./register";
import VerifyEmail from "./verifyEmail";
import { Register } from "./model";
import loader from "@/store/loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

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
      if (response.status === 200) {
        setMessage(response.data.message)
        setShowEmail(true);
        toast.success(response.data.message);
      }
    } catch (er) {
      router.push("/auth/login")
      toast.error((er as any)?.response?.data.message ?  (er as any).response.data.message :   (er as any)?.message);
    }finally{
      dispatch(loader.loader({ loader: false }));
    }
  }

  return (
    <Fragment>
      {!showEmail && <RegisterComponent registerData={sendData} />}
      {showEmail && <VerifyEmail  message={message}/>}
    </Fragment>
  );
}
