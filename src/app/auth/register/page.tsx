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
    setShowEmail(true);
    
    
  }

  return (
    <Fragment>
      {!showEmail && <RegisterComponent registerData={sendData} />}
      {showEmail && <VerifyEmail  message={message}/>}
    </Fragment>
  );
}
