"use client";

import { redirect } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

// The main component with both login logic and suspense boundary
export default function Login() {
  const providers = ["github", "google"];
  const userCookie = Cookies.get("session");

  // Check if user is already logged in
  useEffect(() => {
    if (userCookie) {
      redirect("/");
    }
  }, [userCookie]);

  if (userCookie) return null;

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-20">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent providers={providers} />
      </Suspense>
    </div>
  );
}

// Inner LoginContent component, responsible for rendering different forms
function LoginContent({ providers }) {
  const searchParams = useSearchParams(); // CSR method wrapped in Suspense boundary
  const view = searchParams.get("view") || "login";

  return (
    <>
      {view === "login" && <LoginForm providers={providers} />}
      {view === "signup" && <SignupForm />}
      {view === "forgot" && <ForgotPasswordForm />}
    </>
  );
}