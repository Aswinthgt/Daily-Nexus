"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
   const router = useRouter();
    useEffect(()=>{
      router.push("/dashboard");
    })

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image className="animate-bounce" src="/assets/mainlogo.png" alt="Logo" width={300} height={100} />
    </div>
  );
}
