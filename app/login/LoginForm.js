import Provider from "./Provider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import request from "@/lib/request";
import Cookies from "js-cookie";


const LoginForm = ({ providers }) => {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Sign in with email and password
    const res = await request("/api/auth/local", {
      method: "POST",
      body: {
        identifier: email,
        password: password,
      },
    });

    if (res.result) {
      const session = {
        jwt: res.result.jwt.toString(),
        id: res.result.user.id,
      };
      // Set the user cookie
      Cookies.set("session", JSON.stringify(session), { expires: 7 });
      // Redirect to a different page after successful login
      window.location.href = "/";
    } else {
      setServerError(res.error.message);
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Image
        className="mx-auto hidden dark:block"
        src="/rectangular_logo.png"
        height={0}
        width={150}
        alt="Website logo"
      />
      <Image
        className="mx-auto block dark:hidden"
        src="/rectangular_logo_light.png"
        height={0}
        width={150}
        alt="Website logo"
      />
      {serverError && (
        <div className="text-red-500 text-sm font-medium text-center">
          {serverError}
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M10.036 8.278l9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </span>
          <input
            id="email"
            name="email"
            type="email"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@gmail.com"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
          autoComplete=""
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <div className="dark:text-white flex justify-between w-full mb-2">
        <Link href="/login?view=forgot">Forgot Password?</Link>
        <Link href="/login?view=signup">Sign Up</Link>
      </div>
      <div className="dark:text-white">
        <p className="text-center text-sm mb-4">or you can sign in with</p>
        <div className="flex justify-center gap-2">
          {providers.map((provider, index) => (
            <Provider key={index} provider={provider} />
          ))}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
