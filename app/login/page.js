"use client";

import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";


export default function Login() {
  const providers = ["github", "google"];
  const [activeComponent, setActiveComponent] = useState("login");
  const { data: session } = useSession();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-20">
      {activeComponent === "login" && (
        <LoginForm
          providers={providers}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "signup" && (
        <SignupForm
          providers={providers}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "forgot" && (
        <ForgotPasswordForm setActiveComponent={setActiveComponent}/>
      )}
    </div>
  );
}
