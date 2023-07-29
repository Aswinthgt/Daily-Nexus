import { Fragment, useState } from "react";
import styles from "./card.module.css";
import SideBar from "../sidebar/sidebar";
import { useSelector } from "react-redux";

export default function Card({ children }: { children: React.ReactNode }) {

   const sidebarState = useSelector((state:any)=>state.sideBar)


  return (
    <Fragment>
      <div className="rounded-lg max-h-[85vh] relative">
        {children}
        <div
          className={`${styles.sideBar} fixed top-0 left-0 rounded-r-lg bg-sky-600 min-h-screen w-60 ${
            sidebarState ? "translate-x-[-240px]" : 'translate-x-0'
          } z-20`}
        >
          <SideBar></SideBar>
        </div>
      </div>
    </Fragment>
  );
}
