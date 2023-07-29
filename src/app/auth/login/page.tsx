"use client"

import LoginComponent from "@/components/auth/login/login";
import { useSession } from "next-auth/react";

export default function Login(){

    const {data:session} = useSession()

    console.log(session)

    return (
        <LoginComponent/>
    )
}