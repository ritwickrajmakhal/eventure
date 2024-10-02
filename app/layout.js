import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chat/Chatbot";
import { ThemeModeScript } from "flowbite-react";
import request from "@/lib/request";

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
      </head>
      <body
        className={`min-h-screen relative h-full w-full bg-slate-100 dark:bg-slate-950 bg-[radial-gradient(circle_500px_at_50%_200px,#B797FD,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] transition-colors duration-300`}
      >
        <Chatbot />
        <Navbar navbar={navbar.data?.attributes} />
        <div className="min-h-screen mt-16 py-4">
          {children}
        </div>
        <Footer footer={footer.data?.attributes} />
      </body>
    </html>
  );
}
