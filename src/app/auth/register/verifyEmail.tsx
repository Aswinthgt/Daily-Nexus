"use client"

import { Fragment } from "react";
import { Message } from "./model";



export default function VerifyEmail({message}:Message) {
    return(
        <Fragment>
            <div className="flex justify-center items-center mt-20">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-2xl bg-blue-500 rounded py-1 text-black text-center mb-6">
              Verify Email 
            </h2>
            <div className="mb-4">
              <p className="text-center">
               {message}
              </p>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs mt-5">
            &copy; 2023 Information and Intelligence. All rights reserved.
          </p>
        </div>
      </div>
        </Fragment>
    )
} 