import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { Label } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import request from "@/lib/request";
import Cookies from "js-cookie";

// Initialize drag and drop functionality
const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

const EventScheduler = ({ schedules, onScheduleUpdate }) => {
  const [session, setSession] = useState(null);
  const [initialSchedules, setInitialSchedules] = useState([]); // Keep initialSchedules separate
  const [userSchedules, setUserSchedules] = useState([...schedules]); // Separate user-created schedules
  const userCookie = Cookies.get("session");

  // Fetch and set session from cookies
  useEffect(() => {
    if (userCookie) setSession(JSON.parse(userCookie));
  }, [userCookie]);

  // Fetch initial schedules from the server
  useEffect(() => {
    if (session) {
      const fetchSchedules = async () => {
        const response = await request("/api/schedules", {
          headers: { Authorization: `Bearer ${session.jwt}` },
        });
        if (response.data) {
          const fetchedSchedules = response.data.map((schedule) => ({
            title: schedule.attributes.title,
            start: moment(schedule.attributes.start).toDate(),
            end: moment(schedule.attributes.end).toDate(),
          }));
          setInitialSchedules(fetchedSchedules); // Only set once after fetching
        }
      };
      fetchSchedules();
    }
  }, [session]);

  const allEvents = [...initialSchedules, ...userSchedules]; // Merge only for display purposes

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  const [currentDate, setCurrentDate] = useState(defaultDate);
  const [currentView, setCurrentView] = useState(Views.MONTH);

  const now = new Date();

  // Function to check if an event overlaps with existing ones
  const hasOverlap = ({ start, end }, excludeEvent = null) => {
    return allEvents.some(
      (existingEvent) =>
        existingEvent !== excludeEvent && start < existingEvent.end && end > existingEvent.start
    );
  };

  // Handle event creation
  const handleSelectSlot = ({ start, end }) => {
    if (start < now) {
      alert("You cannot create an event in the past!");
      return;
    }

    if (hasOverlap({ start, end })) {
      alert("Event overlap detected! Please select a different time.");
      return;
    }

    const title = prompt("Your Event Name");
    if (title) {
      const newEvent = { title, start, end };
      const updatedSchedule = [...userSchedules, newEvent]; // Only update userSchedules
      setUserSchedules(updatedSchedule);
      onScheduleUpdate(updatedSchedule); // Update parent component
    }
  };

  // Handle dragging and dropping events
  const handleEventDrop = ({ event, start, end }) => {
    if (start < now) {
      alert("You cannot move the event into the past!");
      return;
    }

    if (hasOverlap({ start, end }, event)) {
      alert("Event overlap detected! Please adjust your event.");
      return;
    }

    const updatedEvents = userSchedules.map((existingEvent) =>
      existingEvent === event ? { ...existingEvent, start, end } : existingEvent
    );
    setUserSchedules(updatedEvents);
    onScheduleUpdate(updatedEvents); // Update parent component
  };

  // Handle resizing events
  const handleEventResize = ({ event, start, end }) => {
    if (start < now) {
      alert("You cannot resize the event into the past!");
      return;
    }

    if (hasOverlap({ start, end }, event)) {
      alert("Event overlap detected! Please adjust your event.");
      return;
    }

    const updatedEvents = userSchedules.map((existingEvent) =>
      existingEvent === event ? { ...existingEvent, start, end } : existingEvent
    );
    setUserSchedules(updatedEvents);
    onScheduleUpdate(updatedEvents); // Update parent component
  };

  // Handle event deletion
  const handleSelectEvent = (event) => {
    if (window.confirm(`Do you want to remove this event "${event.title}"?`)) {
      const updatedEvents = userSchedules.filter((existingEvent) => existingEvent !== event);
      setUserSchedules(updatedEvents);
      onScheduleUpdate(updatedEvents); // Update parent component
    }
  };

  return (
    <div className="col-span-full mb-3">
      <div className="mb-2 block">
        <Label className="text-lg" htmlFor="venue" value="Schedule your event" />

        <div
          style={{ height: "450px" }}
          className="bg-white text-black p-2 rounded-lg shadow-lg mt-2 overflow-x-auto"
        >
          <DragAndDropCalendar
            defaultDate={defaultDate}
            localizer={localizer}
            events={allEvents} // Show both initial and newly created schedules
            startAccessor="start"
            endAccessor="end"
            views={views}
            date={currentDate}
            view={currentView}
            onNavigate={(date) => setCurrentDate(date)}
            onView={(view) => setCurrentView(view)}
            step={60}
            onSelectEvent={handleSelectEvent}
            selectable
            onSelectSlot={(slotInfo) => {
              if (!hasOverlap(slotInfo)) {
                handleSelectSlot(slotInfo);
              } else {
                alert("Event overlap detected! Please select a different time.");
              }
            }}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            resizable
            dragFromOutsideItem={null}
          />
        </div>
      </div>
    </div>
  );
};

export default EventScheduler;