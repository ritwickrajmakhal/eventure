"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Information from "./Information";
import Profile from "./Profile";
import request from "@/lib/request";

const Account = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/login");
  }

  // Fetch user information from the server and set it to the state
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchInformation = async () => {
      if (!session?.user) return;
      try {
        const res = await request(`/api/users/me?populate=*`, {
          headers: {
            Authorization: "Bearer " + session.user.jwt,
          },
        });
        if (!res.error) {
          setUser(res.result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInformation();
  }, [session?.user]);

  return (
    <>
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            User settings
          </h1>
        </div>
        {/* Right Content */}
        <div className="col-span-full xl:col-auto">
          <Profile user={user} session={session} setUser={setUser}/>
        </div>
        <Information user={user} setUser={setUser} session={session} />
      </div>
    </>
  );
};

export default Account;
