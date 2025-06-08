import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeModeScript } from "flowbite-react";
import request from "@/lib/request";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventure",
  description: "Event management system",
};

export default async function RootLayout({ children }) {
  const [navbar, footer] = await Promise.all([
    request("/api/navbar?populate=links"),
    request("/api/footer?populate=links")
  ])
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <Script
          id="copilot-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,o,f,js,fjs){w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};(js=d.createElement(s)),(fjs=d.getElementsByTagName(s)[0]);js.id=o;js.src=f;js.async=1;js.referrerPolicy = "origin";fjs.parentNode.insertBefore(js,fjs);})(window,document,"script","copilot","https://script.copilot.live/v1/copilot.min.js?tkn=cat-a8qa01v2");
              copilot("init",{});
            `
          }}
        />
      </head>
      <body
        className={`min-h-screen relative h-full w-full bg-slate-100 dark:bg-slate-950 bg-[radial-gradient(circle_500px_at_50%_200px,#B797FD,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] transition-colors duration-300`}
      >
        <ToastContainer />
        <Navbar navbar={navbar.data?.attributes} />
        <div className="min-h-screen mt-16 py-4">
          {children}
        </div>
        <Footer footer={footer.data?.attributes} />
      </body>
    </html>
  );
}
