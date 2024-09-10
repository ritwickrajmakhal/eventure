"use client";

import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Avatar } from "flowbite-react";
import Cookies from "js-cookie";
import request from "@/lib/request";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: true },
    { name: "Events", href: "/events", current: false },
    { name: "Services", href: "/services", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Contact", href: "/contact", current: false },
  ]);
  const [avatar, setAvatar] = useState("");
  const userCookie = Cookies.get("session");
  const [session, setSession] = useState(null);
  useEffect(() => {
    if (userCookie) {
      setSession(JSON.parse(userCookie));
    }
  }, [userCookie]);

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        const res = await request("/api/users/me?populate=*", {
          headers: {
            Authorization: "Bearer " + session.jwt,
          },
        });
        if (res.result) {
          setAvatar(res.result.avatar?.url);
        }
      };
      fetchUser();
    }
  }, [session]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="sr-only">Open main menu</span>
              {showDropdown ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* logo */}
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-white font-bold text-xl" href="/">
                Eventure
              </h1>
            </div>
            {/* navigation */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    onClick={() =>
                      setNavigation(
                        navigation.map((nav) => ({
                          ...nav,
                          current: nav.name === item.name,
                        }))
                      )
                    }
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* login button */}
          {/* Show profile picture and options if session.status is authenticated */}
          {session ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {avatar ? (
                      <Avatar
                        img={`${
                          process.env.NEXT_PUBLIC_API_URL || ""
                        }${avatar}`}
                        rounded
                      />
                    ) : (
                      <Avatar rounded />
                    )}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Account
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      onClick={() => {
                        Cookies.remove("session");
                        window.location.reload();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  <Link href="/login">Login</Link>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div ref={dropdownRef} className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="div"
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                <Link
                  href={item.href}
                  className="block h-full w-full"
                  onClick={() =>
                    setNavigation(
                      navigation.map((nav) => ({
                        ...nav,
                        current: nav.name === item.name,
                      }))
                    )
                  }
                >
                  {item.name}
                </Link>
              </Disclosure.Button>
            ))}
          </div>
        </div>
      )}
    </Disclosure>
  );
}
