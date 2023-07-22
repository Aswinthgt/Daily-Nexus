"use client";

import Toolbar from "./toolbar/toolbar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Load } from "@/models/interface";
import { Fragment } from "react";

export default function MainPage({ children }: { children: React.ReactNode }) {
  const load = useSelector((state: Load) => state.load);

  return (
    <Fragment>
      <Toolbar />
      <div className={load.loader ? "pointer-events-none opacity-40" : undefined}>{children}</div>
    
      <ToastContainer />
    </Fragment>
  );
}
