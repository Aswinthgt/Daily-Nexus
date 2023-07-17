"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
   const router = useRouter();
    useEffect(()=>{
      router.push("/auth/login");
    })

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image src="/assets/mainlogo.png" alt="Logo" width={300} height={200} />
    </div>
  );
}
