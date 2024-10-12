"use client";

import { useEffect } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation"; // Import useParams for dynamic routing
import request from "@/lib/request";
import Cookies from "js-cookie";
import showToast from "@/lib/toast";

const LoginRedirect = () => {
  const searchParams = useSearchParams();
  const { provider } = useParams(); // Extract 'provider' from the dynamic route
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");

    if (accessToken && provider) {
      const login = async () => {
        // Make the request to your Strapi callback endpoint with the provider and access token
        const res = await request(
          `/api/auth/${provider}/callback?access_token=${accessToken}`
        );
        if (res.result) {
          const session = {
            jwt: res.result.jwt.toString(),
            id: res.result.user.id,
          };
          // Set the user cookie
          Cookies.set("session", JSON.stringify(session), {
            expires: 7, // Cookie will expire in 7 days
            secure: true, // Ensures the cookie is sent over HTTPS
            sameSite: "Strict", // Prevents the cookie from being sent in cross-site requests
            path: "/", // Cookie is available across the whole website
          });
          // Redirect to a different page after successful login
          window.location.href = "/";
        } else {
          showToast("error", res.error.message);
          router.push('/login');
        }
      };

      login();
    } else {
      showToast("error", "No access token found in the URL or provider is missing.");
    }
  }, [searchParams, provider]);

  return <></>;
};

export default LoginRedirect;
