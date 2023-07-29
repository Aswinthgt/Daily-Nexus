"use client";

import Toolbar from "../components/toolbar/toolbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/store/store";
import { SessionProvider } from "next-auth/react";

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
        <SessionProvider>
      <Toolbar />
        {children}
        <Toaster />
      </SessionProvider>
    </Provider>
  );
}
