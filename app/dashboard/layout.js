"use client";

import Cookies from "js-cookie";
import { useState, useRef, useEffect } from "react";
import { redirect } from "next/navigation";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiCalendar, HiUser, HiMenu } from "react-icons/hi";
import Link from "next/link";

const Dashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sideBarRef = useRef(null);
  const toggleButtonRef = useRef(null); // Ref for the toggle button

  // Redirect to login if not authenticated
  const userCookie = Cookies.get("session");
  useEffect(() => {
    if (!userCookie) {
      redirect("/login");
    }
  }, [userCookie]);

  // Toggle sidebar visibility on smaller screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the sidebar and not on the toggle button
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Toggle button for mobile view */}
      <div
        className="md:hidden p-4 cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        ref={toggleButtonRef} // Assign ref to toggle button
      >
        <HiMenu className="h-6 w-6 ml-auto text-white hover:ring-2 hover:ring-white hover:rounded-md hover:bg-gray-800" />
      </div>

      {/* Sidebar: hidden on small screens, visible on medium and larger */}
      <div
        ref={sideBarRef} // Ref for the sidebar wrapper div
        className={`fixed z-40 w-64 transition-transform transform h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar id="sideBar" aria-label="Responsive sidebar">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} href="/dashboard" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiCalendar} label="Events">
                <Sidebar.Item as={Link} href="/dashboard/events">
                  My Events
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item as={Link} href="/dashboard/audiences" icon={HiUser}>
                My Audiences
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 lg:ml-64 text-white">{children}</div>
    </div>
  );
};

export default Dashboard;
