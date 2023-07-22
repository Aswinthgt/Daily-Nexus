"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import BarLoader from "react-spinners/BarLoader";
import { useSelector } from "react-redux";
import { Load } from "@/models/interface";

export default function Toolbar() {
  const pathName = usePathname();
  const load = useSelector((state: Load) => state.load.loader);
  return (
    <Fragment>
      <div className="sticky top-0 z-20 bg-white-500">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src="/assets/mainlogo.png"
              alt="mailLogo"
              width={150}
              height={100}
              priority
            />
          </div>
          <div className="me-8 text-white">
            <Link
              href={
                pathName === "/auth/login" ? "/auth/register" : "/auth/login"
              }
              className="bg-indigo-500 hover:bg-indigo-800 rounded-full py-2 px-4"
            >
              {pathName === "/auth/login" ? "Register" : "Login"}
            </Link>
          </div>
        </div>
        {load && (
          <BarLoader className="sticky top-5" width="100%" color="#007aff" />
        )}
      </div>
    </Fragment>
  );
}
