"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>
        Welcome, {session?.user.name} <br />
        Your email is {session?.user.email} <br />
        Your user id is {session?.user.id}
      </p>
    </div>
  );
};

export default Dashboard;
