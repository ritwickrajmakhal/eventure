"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useSession } from "next-auth/react";

export default function Login() {
  const providers = ["github", "google"];
  const [activeComponent, setActiveComponent] = useState("login");
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    redirect("/dashboard");
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
        <SignupForm setActiveComponent={setActiveComponent} />
      )}
      {activeComponent === "forgot" && (
        <ForgotPasswordForm setActiveComponent={setActiveComponent} />
      )}
    </div>
  );
}
