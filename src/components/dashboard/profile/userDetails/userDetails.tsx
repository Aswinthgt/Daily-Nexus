import { useSession } from "next-auth/react";
import Image from "next/image";
import { UserDetails } from "./models"

export function UserDetails() {

  const { data :session } = useSession();

  console.log(session)

  return (
    <div className="flex mt-10">
      <div className="flex-none w-14 min-h-screen"></div>
      <div className="grow min-h-screen">
        <div className="grid grid-cols-1 gap-6 h-40 md:grid-cols-3">
          <div className="bg-gradient-to-r from-sky-100 ring-2 ring-blue-300 rounded-lg shadow-md hover:ring-blue-500 hover:shadow-2xl hover:transition hover:duration-500 flex items-center justify-evenly">
            <Image
            className="rounded-full"
              src={(session as UserDetails )?.picture ? (session as UserDetails )?.picture : "/assets/blank-profile-photo.jpg"}
              alt="profile"
              width={100}
              height={100}
            ></Image>
            <div><h6>{session?.user?.name}</h6><p>{session?.user?.email}</p></div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="flex-none w-14 min-h-screen"></div>
    </div>
  );
}
