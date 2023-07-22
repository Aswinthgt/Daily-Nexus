import { Fragment } from "react";
import Toolbar from "./toolbar/toolbar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Load } from "@/models/interface";

export default function MainPage ({ children }: { children: React.ReactNode }) {

    const load = useSelector((state: Load) => state.load.loader);
    return (
      <Fragment>
        <Toolbar />
        <div className={load ? "pointer-events-none opacity-40" : "z-0"}>{children}</div>
        <ToastContainer />
      </Fragment>
    );
  };