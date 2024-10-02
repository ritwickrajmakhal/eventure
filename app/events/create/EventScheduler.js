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
  const userCookie = Cookies.get("session");
  // Check if session exists, redirect to login if absent
  useEffect(() => {
    if (userCookie) setSession(JSON.parse(userCookie));
  }, [userCookie]);

  // fetch initial schedules of other events
  const [initialSchedules, setInitialSchedules] = useState([]);

  useEffect(() => {
    if (session) {
      const fetchSchedules = async () => {
        const response = await request("/api/schedules", {
          headers: { Authorization: `Bearer ${session.jwt}` },
        });
        if (response.data) {
          setInitialSchedules(
            response.data.map((schedule) => ({
              title: schedule.attributes.title,
              start: new Date(schedule.attributes.start),
              end: new Date(schedule.attributes.end),
            }))
          );
        }
      };
      fetchSchedules();
    }
  }, [session]);

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  // State to manage the current view and date
  const [currentDate, setCurrentDate] = useState(defaultDate);
  const [currentView, setCurrentView] = useState(Views.MONTH);

  // Handle new event creation by selecting a time range
  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Your Event Name");
    if (title) {
      const newEvent = { title, start, end };
      const updatedSchedule = [...schedules, newEvent]; // Adding new event
      onScheduleUpdate(updatedSchedule); // Update in parent state
    }
  };

  // Handle event drag and drop to a new time slot
  const handleEventDrop = ({ event, start, end }) => {
    const updatedSchedule = schedules.map((existingEvent) =>
      existingEvent === event ? { ...existingEvent, start, end } : existingEvent
    );
    onScheduleUpdate(updatedSchedule); // Update in parent state
  };

  // Handle event resizing
  const handleEventResize = ({ event, start, end }) => {
    const updatedSchedule = schedules.map((existingEvent) =>
      existingEvent === event ? { ...existingEvent, start, end } : existingEvent
    );
    onScheduleUpdate(updatedSchedule);
  };

  // Check if events overlap
  const hasOverlap = ({ start, end }) => {
    return schedules.some(
      (existingEvent) => start < existingEvent.end && end > existingEvent.start
    );
  };

  // Handle event selection
  const handleSelectEvent = (event) => {
    if (window.confirm(`Do you want to remove this event "${event.title}"`)) {
      const updatedSchedule = schedules.filter(
        (existingEvent) => existingEvent !== event
      );
      onScheduleUpdate(updatedSchedule);
    }
  };
  return (
    <div className="col-span-full mb-3">
      <div className="mb-2 block">
        {/* Label for Event Scheduling */}
        <Label
          className="text-lg"
          htmlFor="venue"
          value="Schedule your event"
        />

        {/* Calendar Display */}
        <div
          style={{ height: "450px" }}
          className="bg-white text-black p-2 rounded-lg shadow-lg mt-2 overflow-x-auto"
        >
          <DragAndDropCalendar
            defaultDate={defaultDate}
            localizer={localizer}
            events={[...initialSchedules, ...schedules]} // Combine initial schedules with added ones
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
                alert(
                  "Event overlap detected! Please select a different time."
                );
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
