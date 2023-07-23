"use client";

import Toolbar from "./toolbar/toolbar";
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import store from "@/store/store";

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toolbar />
      {children}
      <Toaster />
    </Provider>
  );
}
