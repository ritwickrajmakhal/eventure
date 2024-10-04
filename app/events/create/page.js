"use client";
import { Label, TextInput, Checkbox } from "flowbite-react";
import Cookies from "js-cookie";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import request from "@/lib/request";
import AudienceSelector from "./AudienceSelector";
import VenueSelector from "./VenueSelector";
import EventTemplateSelector from "./EventTemplateSelector";
import EventScheduler from "./EventScheduler";
import ServicesSelector from "./ServicesSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummary from "./OrderSummary";
import PlanSelector from "./PlanSelector";
import { v4 as uuidv4 } from "uuid";

const CreateEventContent = ({ router, session }) => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventTemplate: null,
    audiences: [],
    venue: null,
    schedules: [],
    services: [],
  });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  // Display toast message
  const showToast = (type, message) => {
    toast[type](message);
  };

  // Handle form input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Extract search params and fetch necessary data
  useEffect(() => {
    if (session) {
      const fetchEventData = async () => {
        const eventTemplateSlug = searchParams.get("template");
        const venueSlug = searchParams.get("venue");
        const audienceSlug = searchParams.get("audience");

        if (eventTemplateSlug) {
          const plan = searchParams.get("plan");
          const eventTemplate = await request(`/api/event-templates?filters[slug][$eq]=${eventTemplateSlug}&populate=thumbnail,plans,plans.services`);
          const selectedPlan = eventTemplate.data[0].attributes.plans.find((p) => p.type === plan);
          setSelectedPlan(selectedPlan);
          setFormData((prevData) => ({ ...prevData, eventTemplate: eventTemplate.data[0], services: selectedPlan?.services.data || [] }));
        }

        if (venueSlug) {
          const venue = await request(`/api/venues?filters[slug][$eq]=${venueSlug}&populate=thumbnail`);
          setFormData((prevData) => ({ ...prevData, venue: venue.data[0] }));
        }

        if (audienceSlug) {
          const audience = await request(`/api/audiences?filters[slug][$eq]=${audienceSlug}`, {
            headers: { Authorization: `Bearer ${session.jwt}` },
          });
          setFormData((prevData) => ({ ...prevData, audience: audience.data[0] }));
        }
      };

      fetchEventData();
    }
  }, [searchParams, session]);

  // Form validation

  const validateForm = () => {
    if (!formData.name) {
      showToast("error", "Please enter event name");
      return false;
    }

    if (!formData.eventTemplate) {
      showToast("error", "Please select an event template");
      return false;
    }

    if (!formData.venue) {
      showToast("error", "Please select a venue");
      return false;
    }

    if (formData.audiences.length === 0) {
      showToast("error", "Please select at least one audience");
      return false;
    }

    if (formData.venue.attributes.capacity < formData.audiences.reduce((acc, audience) => acc + audience.attributes.details.length, 0)) {
      showToast("error", "Audience size exceeds venue capacity");
      return false;
    }

    if (formData.schedules.length === 0) {
      showToast("error", "Please add at least one schedule");
      return false;
    }

    return true;
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (validateForm()) {
      setLoading(true);
      // create schedule in server and get the ids
      const schedulePromises = formData.schedules.map(async (schedule) => {
        const response = await request("/api/schedules", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.jwt}`, },
          body: { data: schedule },
        });
        return { ...schedule, id: response.data.id };
      });

      // Wait for all schedules to be created and update formData.schedules
      formData.schedules = await Promise.all(schedulePromises);

      // Create event with the schedule ids
      const jsonData = {
        data: {
          slug: uuidv4(),
          user: session.id,
          name: formData.name,
          description: formData.description,
          audiences: formData.audiences.map(audience => audience.id),
          venue: formData.venue.id,
          schedules: formData.schedules.map(schedule => schedule.id),
          services: formData.services.map(service => service.id),
          status: "Waiting for approval",
        }
      };

      // Send event creation request
      const response = await request("/api/events", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.jwt}`, },
        body: jsonData,
      });

      if (response.error) {
        showToast("error", response.error.message);
      }
      else {
        showToast("success", "Event created successfully");
        router.push(`/dashboard/myevents`);
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 gap-3 dark:text-white">
        <h1 className="text-3xl font-semibold text-center col-span-full">
          Create a new event
        </h1>

        {/* Event Details */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
          <h3 className="text-2xl font-semibold mb-4">Event Details</h3>

          {/* Event Name & Description */}
          <div className="grid gap-6 sm:grid-cols-2 mb-3">
            <div>
              <Label className="text-lg" htmlFor="name" value="Event Name" />
              <TextInput id="name" value={formData.name} name="name" onChange={onInputChange} placeholder="Teacher's Day" required />
            </div>
            <div>
              <Label className="text-lg" htmlFor="description" value="Event Description" />
              <TextInput id="description" value={formData.description} name="description" onChange={onInputChange} placeholder="Teacher's Day is a special day for the appreciation of teachers." />
            </div>
          </div>

          {/* Event Template Selector */}
          <EventTemplateSelector eventTemplate={formData.eventTemplate} onSelectEventTemplate={(template) => setFormData({ ...formData, eventTemplate: template, })} />

          {/* Venue Selector */}
          <VenueSelector selectedVenue={formData.venue} onSelectVenue={(venue) => setFormData({ ...formData, venue: venue, })} />

          {/* Event Scheduler */}
          <EventScheduler schedules={formData.schedules} onScheduleUpdate={(updatedSchedules) => setFormData({ ...formData, schedules: updatedSchedules })} />
        </div>

        <div className="col-span-full xl:col-auto">
          {/* Event Logistics */}
          <div className="bg-white p-3 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Event Logistics</h3>
            {/* Audience Selector */}
            <AudienceSelector audiences={formData.audiences} onAudienceSelect={(selectedAudiences) => setFormData((prevData) => ({ ...prevData, audiences: selectedAudiences, }))} />

            {/* Event Plans for events templates */}
            <PlanSelector selectedPlan={selectedPlan} eventTemplate={formData.eventTemplate} />
            {/* Services */}
            <ServicesSelector services={formData.services} onServiceSelect={(selectedServices) => setFormData((prevData) => ({ ...prevData, services: selectedServices, }))} />
          </div>

          {/* Order summary */}
          <OrderSummary loading={loading} formData={formData} />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable={true} pauseOnHover theme="light" />
    </form>
  );
};

const CreateEvent = () => {
  const [session, setSession] = useState(null);
  const router = useRouter();
  const userCookie = Cookies.get("session");

  useEffect(() => {
    if (!userCookie) {
      router.push("/login");
    } else {
      setSession(JSON.parse(userCookie));
    }
  }, [userCookie, router]);

  if (!session) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateEventContent router={router} session={session} />
    </Suspense>
  );
};

export default CreateEvent;
