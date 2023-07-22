"use client"

import { Fragment } from "react";
import Toolbar from "./toolbar/toolbar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Load } from "@/models/interface";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function MainPage({ children }: { children: React.ReactNode }) {

  return (
    <Fragment>
      <Provider store={store}>
        <Toolbar />
       
          {children}
        
        <ToastContainer />
      </Provider>
    </Fragment>
  );
}
