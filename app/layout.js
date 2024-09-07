import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chat/Chatbot";
import SessionWrapper from "@/components/SessionWrapper";
import { ThemeModeScript } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventure",
  description: "Event management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <SessionWrapper>
        <body className="min-h-screen relative h-full w-full bg-slate-950 bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
          <Chatbot />
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </body>
      </SessionWrapper>
    </html>
  );
}
