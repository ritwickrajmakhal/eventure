"use client";
import { Label, TextInput, Checkbox } from "flowbite-react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import request from "@/lib/request";
import Plan from "@/components/Plan";
import AudienceSelector from "./AudienceSelector";
import VenueSelector from "./VenueSelector";
import EventTemplateSelector from "./EventTemplateSelector";
import EventScheduler from "./EventScheduler";
import ServicesSelector from "./ServicesSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = () => {
  const [session, setSession] = useState(null);
  const [eventTemplates, setEventTemplates] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventTemplate: null,
    audience: null,
    venue: null,
    schedules: [],
    services: [],
  });
  const router = useRouter();
  const userCookie = Cookies.get("session");

  // Display toast message
  const showToast = (type, message) => {
    toast[type](message);
  };

  // Check if session exists, redirect to login if absent
  useEffect(() => {
    if (!userCookie) {
      router.push("/login");
    } else {
      setSession(JSON.parse(userCookie));
    }
  }, [userCookie, router]);

  // Fetch event templates, audiences, and venues
  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const [templates, aud, ven] = await Promise.all([
          request(
            "/api/event-templates?populate=thumbnail,plans,plans.services"
          ),
          request(`/api/audiences?filters[user][$eq]=${session.id}`, {
            headers: { Authorization: `Bearer ${session.jwt}` },
          }),
          request("/api/venues?populate=thumbnail"),
        ]);
        setEventTemplates(templates.data);
        setAudiences(aud.data);
        setVenues(ven.data);
      };
      fetchData();
    }
  }, [session]);

  // Handle form input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const jsonData = {
      data: {
        name: formData.name,
        description: formData.description,
        venue: formData.venue.id,
        user: session.id,
        audience: formData.audience.id,
        events: formData.scheduledEvents,
      },
    };

    try {
      const res = await request("/api/events", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.jwt}` },
        body: jsonData,
      });

      if (res.error) {
        showToast("error", res.error.message);
      } else {
        router.push(`/dashboard/events`);
      }
    } catch (err) {
      showToast("error", "An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 gap-3 dark:text-white">
        <h1 className="text-3xl font-semibold text-center col-span-full">
          Create a new event
        </h1>

        {/* Event form */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
          <h3 className="text-2xl font-semibold mb-4">Event Details</h3>

          {/* Event Name & Description */}
          <div className="grid gap-6 sm:grid-cols-2 mb-3">
            <div>
              <Label className="text-lg" htmlFor="name" value="Event Name" />
              <TextInput
                id="name"
                value={formData.name}
                name="name"
                onChange={onInputChange}
                placeholder="Teacher's Day"
                required
              />
            </div>
            <div>
              <Label
                className="text-lg"
                htmlFor="description"
                value="Event Description"
              />
              <TextInput
                id="description"
                value={formData.description}
                name="description"
                onChange={onInputChange}
                required
                placeholder="Teacher's Day is a special day for the appreciation of teachers."
              />
            </div>
          </div>

          {/* Event Template Selector */}
          <EventTemplateSelector
            formData={formData}
            eventTemplates={eventTemplates}
            onSelectEventTemplate={(id) =>
              setFormData({
                ...formData,
                eventTemplate: eventTemplates.find((t) => t.id === id),
              })
            }
          />

          {/* Venue Selector */}
          <VenueSelector
            formData={formData}
            venues={venues}
            onSelectVenue={(id) =>
              setFormData({
                ...formData,
                venue: venues.find((v) => v.id === id),
              })
            }
          />

          {/* Event Scheduler */}
          <EventScheduler
            schedules={formData.schedules}
            onScheduleUpdate={(updatedSchedules) =>
              setFormData({ ...formData, schedules: updatedSchedules })
            }
          />
        </div>

        <div className="col-span-full xl:col-auto">
          <div className="bg-white p-3 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Event Logistics</h3>
            {/* Audience Selector */}
            <AudienceSelector
              audiences={audiences}
              onSelect={(id) =>
                setFormData({
                  ...formData,
                  audience: audiences.find((a) => a.id == id),
                })
              }
            />

            {/* Event Services Details */}
            {formData.eventTemplate ? (
              <div className="col-span-full">
                <Label htmlFor="eventTemplate" value="Select a Plan" />
                <div className="flex overflow-x-auto pt-2">
                  {formData.eventTemplate.attributes.plans.map(
                    (plan, index) => (
                      <Plan
                        slug={formData.eventTemplate.attributes.slug}
                        key={index}
                        price={plan.price}
                        premiumServices={
                          formData.eventTemplate.attributes.plans.find(
                            (plan) => plan.type === "Premium"
                          )?.services.data || []
                        }
                        services={plan.services.data}
                        type={plan.type}
                      />
                    )
                  )}
                </div>
              </div>
            ) : (
              <ServicesSelector
                services={formData.services}
                onServiceSelect={(selectedServices) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    services: selectedServices,
                  }));
                }}
              />
            )}
          </div>
        </div>

        <div className="col-span-full">
          <div className="bg-white p-3 rounded-lg shadow-sm dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <Checkbox id="accept" required />
              <Label htmlFor="accept" className="flex">
                I agree with the&nbsp;
                <a
                  href="#"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  terms and conditions
                </a>
              </Label>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </form>
  );
};

export default CreateEvent;