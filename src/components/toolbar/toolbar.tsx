"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import BarLoader from "react-spinners/BarLoader";
import { Load } from "@/models/interface";
import { signOut, useSession } from "next-auth/react";
import styles from "./toolbar.module.css";
import { useSelector } from "react-redux";


export default function Toolbar() {
  const pathName = usePathname();
  const load = useSelector((state: Load) => state.load.loader);
  const { data: session } = useSession();


  return (
    <Fragment>
      <div className="sticky ps-8 pe-8 pt-4 pb-4 top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer">
            <Image
              className={styles.spin}
              src="/assets/mainlogo.png"
              alt="mailLogo"
              width={60}
              height={30}
              priority
            />
          </div>
          <div className="text-white">
            {!session?.user && (
              <Link
                href={
                  pathName === "/auth/login" ? "/auth/register" : "/auth/login"
                }
                className="bg-indigo-500 hover:bg-indigo-800 rounded-full py-2 px-4"
              >
                {pathName === "/auth/login" ? "Register" : "Login"}
              </Link>
            )}

            {session?.user && (
              <button
                onClick={() => signOut()}
                className="bg-indigo-500 hover:bg-indigo-800 rounded-full py-2 px-4"
              >
                SignOut
              </button>
            )}
          </div>
        </div>
        {load && (
          <BarLoader
            className="sticky top-5 p-0"
            width="100%"
            color="#007aff"
          />
        )}
      </div>
    </Fragment>
  );
}
