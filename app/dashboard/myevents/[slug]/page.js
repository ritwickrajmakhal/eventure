"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import request from "@/lib/request";
import EventDetails from "./EventDetails";

const EventPage = ({ params }) => {
    const [session, setSession] = useState(Cookies.get("session") ? JSON.parse(Cookies.get("session")) : null);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (session) {
            (async () => {
                const event = await request(
                    `/api/events?filters[user][$eq]=${session.id}&filters[slug][$eq]=${params.slug}&populate=venue,schedules,services,audiences`,
                    { headers: { Authorization: `Bearer ${session.jwt}` } }
                );
                setEvent(event.data[0]);
            })();
        }
    }, [session, params]);
    return (
        <>
            {event && <EventDetails eventData={event} />}
        </>
    )
}

export default EventPage