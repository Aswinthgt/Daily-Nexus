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
  const [message, setMessage] = useState("check your mail");

  function sendData(register: Register, value: boolean) {
    registerSave(register);
  }

  const dispatch = useDispatch();
  const router = useRouter();

  async function registerSave(registerdata: Register) {
    try {
      dispatch(loader.loader({ loader: true }));
      const response = await fetch("../api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerdata),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setShowEmail(true);
      }
    } catch (er) {
      dispatch(loader.loader({ loader: false }));
      router.push("/auth/login");
      toast.warning(
        (er as any)?.data?.message
          ? (er as any).data.message
          : (er as any)?.message,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        }
      );
    } finally {
      dispatch(loader.loader({ loader: false }));
    }
  }

  return (
    <Fragment>
      {!showEmail && <RegisterComponent registerData={sendData} />}
      {showEmail && <VerifyEmail message={message} />}
    </Fragment>
  );
}
