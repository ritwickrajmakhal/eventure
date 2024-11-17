"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import request from "@/lib/request";
import showToast from "@/lib/toast";

export const ForgotPasswordForm = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await request("/api/auth/forgot-password", {
      method: "POST",
      body: { email: email }
    });
    console.log(res);

    if (res.result) {
      showToast("success", "Password reset link sent to your email.");
      setEmail("");
    }
    else showToast("error", `An error occurred: ${res.error.message}`);
    setLoading(false);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Logo />
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="email4" value="Your email" />
        </div>
        <TextInput id="email4" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={HiMail} placeholder="name@eventure.com" required />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? "Loading..." : "Send reset link"}
      </button>
      <button className="w-full dark:text-white hover:underline focus:outline-none font-medium text-sm text-center">
        <Link href="/login">Back to login</Link>
      </button>
    </form>
  );
};
