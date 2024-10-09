"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import request from "@/lib/request";
import EventDetails from "./EventDetails";
import { useRouter } from "next/navigation";

const EventPage = ({ params }) => {
    const [session, setSession] = useState(Cookies.get("session") ? JSON.parse(Cookies.get("session")) : null);
    const [event, setEvent] = useState(null);
    const router = useRouter();

    // Fetch event data
    useEffect(() => {
        if (session) {
            (async () => {
                const event = await request(
                    `/api/events?filters[user][$eq]=${session.id}&filters[slug][$eq]=${params.slug}&populate=venue,schedules,services,audiences`,
                    { headers: { Authorization: `Bearer ${session.jwt}` } }
                );
                if (event.data.length === 0) {
                    router.push("/404");
                }
                setEvent(event.data[0]);
            })();
        }
    }, [session, params, router]);
    return (
        <>
            {event && <EventDetails eventData={event} />}
        </>
    )
}

export default EventPage