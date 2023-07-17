"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function Toolbar() {

const pathName = usePathname();

  return (
    <Fragment>
      <div className="flex items-center justify-between sticky top-0 z-10">
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
          <Link href={pathName === "/auth/login" ? "/auth/register" : "/auth/login"} className="bg-indigo-500 hover:bg-indigo-800 rounded-full py-2 px-4">
            {pathName === "/auth/login" ? "Register" : "Login"}
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
