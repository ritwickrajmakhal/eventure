"use client";

import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import request from "@/lib/request";
import Cookies from "js-cookie";

const page = () => {
  const [session, setSession] = useState(null);
  const userCookie = Cookies.get("session");
  // Check if session exists, redirect to login if absent
  useEffect(() => {
    if (userCookie) setSession(JSON.parse(userCookie));
  }, [userCookie]);

  const [events, setEvents] = useState(null);
  const [audiences, setAudiences] = useState(null);
  
  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const [events, audiences] = await Promise.all([
          request(`/api/events?filters[user][$eq]=${session.id}&sort[id]=desc`, {
            headers: { Authorization: `Bearer ${session.jwt}` },
          }),
          request(`/api/audiences?filters[user][$eq]=${session.id}`, {
            headers: { Authorization: `Bearer ${session.jwt}` },
          }),
        ]);
        setEvents(events);
        setAudiences(audiences);
      };
      fetchData();
    }
  }, [session]);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Event Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Events */}
        <Card>
          <h2 className="text-xl font-bold mb-2">Total Events</h2>
          <p className="text-3xl font-semibold">
            {events ? events.data.length : 0}
          </p>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-3xl font-semibold">
            {events ? events.data.filter((event) => ["Approved", "Waiting for Approval"].includes(event.attributes.status)).length : 0}
          </p>
        </Card>

        {/* Registered Users */}
        <Card>
          <h2 className="text-xl font-bold mb-2">Registered Users</h2>
          <p className="text-3xl font-semibold">
            {audiences ? audiences.data.reduce((acc, audience) => acc + audience.attributes.details.length, 0) : 0}
          </p>
        </Card>
      </div>

      {/* Recent Events */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Events</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-bold text-xl">Event Name 1</h3>
          <p>Date: Sept 15, 2024</p>
          <p>Location: New York</p>
        </Card>
        {/* Add more events as needed */}
      </div>
    </div>
  );
};

export default page;
