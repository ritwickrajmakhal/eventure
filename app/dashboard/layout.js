"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiCalendar,
  HiUser,
  HiMenu,
} from "react-icons/hi";
import Link from "next/link";

const Dashboard = ({ children }) => {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    redirect("/login");
  }

  // Toggle sidebar visibility on smaller screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Toggle button for mobile view */}
      <div
        className="md:hidden p-4 cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <HiMenu className="h-6 w-6 ml-auto text-white hover:ring-2 hover:ring-white hover:rounded-md hover:bg-gray-800" />
      </div>

      {/* Sidebar: hidden on small screens, visible on medium and larger */}
      <Sidebar
        aria-label="Responsive sidebar"
        className={`fixed z-40 w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} href="/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiCalendar} label="Events">
              <Sidebar.Item as={Link} href="/dashboard/events">My Events</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="#" icon={HiUser}>
              Attendees
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Main content */}
      <div className="flex-1 p-4 lg:ml-64 text-white">{children}</div>
    </div>
  );
};

export default Dashboard;
