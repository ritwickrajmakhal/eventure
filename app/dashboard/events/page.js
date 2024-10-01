"use client";
import { Button, Tabs } from "flowbite-react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import request from "@/lib/request";
import EventTable from "./EventTable";

const page = () => {
  const [session, setSession] = useState(Cookies.get("session") ? JSON.parse(Cookies.get("session")) : null);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    if (session) {
      (async () => {
        const events = await request(
          `/api/events?filters[user][$eq]=${session.id}&populate=audience&sort[id]=desc`,
          { headers: { Authorization: `Bearer ${session.jwt}` } }
        );
        setEvents(events.data);
      })();
    }
  }, [session]);

  const filterEvents = (statuses) =>
    events?.filter((event) => statuses.includes(event.attributes.status));

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Events
        </h1>
        <Button as={Link} href="/events/create" pill color="blue">
          <PlusCircleIcon className="mr-2 h-5 w-5" />
          Create
        </Button>
      </div>
      <Tabs aria-label="Tabs with icons" variant="underline">
        <Tabs.Item active title="Ongoing events">
          <EventTable events={filterEvents(["Ongoing", "Waiting for approval", "Approved"])} />
        </Tabs.Item>
        <Tabs.Item title="Past events">
          <EventTable events={filterEvents(["Completed", "Rejected"])} />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default page;