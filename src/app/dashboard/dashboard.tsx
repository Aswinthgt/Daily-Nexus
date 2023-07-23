"use client";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import loader from "@/store/loader";
import { useRouter } from "next/navigation";
import { User } from "./model";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState<Partial<User>>();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      dispatch(loader.loader({ loader: true }));
      const response = await axios.get("./api/dashboard", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setUser(response.data.data);
    } catch (er) {
      toast.error(
        (er as any)?.response?.data.message
          ? (er as any).response.data.message
          : (er as any)?.message
      );
      router.push("/auth/login");
    } finally {
      dispatch(loader.loader({ loader: false }));
    }
  }

  return (
    <Fragment>
      {!user && (
        <div className="flex justify-center items-center mt-20">Loading...</div>
      )}

      {user && (
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight text-center">
            {user.userName}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm text-center">
            {user.email}
          </p>
        </div>
      )}
    </Fragment>
  );
}
