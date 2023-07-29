"use client";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import loader from "@/store/loader";
import { useRouter } from "next/navigation";
import { User } from "../../app/dashboard/model";
import Profile from "./profile/profile";
import Card from "./card/card";
import SideBar from "./sidebar/sidebar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState<Partial<User>>();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      dispatch(loader.loader({ loader: true }));
      const response = await axios.get("./api/dashboard", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setUser(response.data.data);
    } catch (er) {
      toast.error(
        (er as any)?.response?.data.message
          ? (er as any).response.data.message
          : (er as any)?.message
      );
      router.push("/auth/login");
    } finally {
      dispatch(loader.loader({ loader: false }));
    }
  }

  return (
    <div>
      
      <Card>
        {!user && (
          <div className="flex justify-center items-center mt-20">
            Loading...
          </div>
        )}
        <Profile></Profile>
        
      </Card>
    </div>
  );
}
