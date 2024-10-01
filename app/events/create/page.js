"use client";
import { Label, TextInput, Checkbox } from "flowbite-react";
import Cookies from "js-cookie";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import request from "@/lib/request";
import Plan from "@/components/Plan";
import AudienceSelector from "./AudienceSelector";
import VenueSelector from "./VenueSelector";
import EventTemplateSelector from "./EventTemplateSelector";
import EventScheduler from "./EventScheduler";
import ServicesSelector from "./ServicesSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummary from "./OrderSummary";

const CreateEventContent = ({ session }) => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventTemplate: null,
    audience: null,
    venue: null,
    schedules: [],
    services: [],
  });

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

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

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
              <TextInput id="description" value={formData.description} name="description" onChange={onInputChange} required placeholder="Teacher's Day is a special day for the appreciation of teachers." />
            </div>
          </div>

          {/* Event Template Selector */}
          <EventTemplateSelector formData={formData} onSelectEventTemplate={(template) => setFormData({ ...formData, eventTemplate: template, })} />

          {/* Venue Selector */}
          <VenueSelector formData={formData} onSelectVenue={(venue) => setFormData({ ...formData, venue: venue, })} />

          {/* Event Scheduler */}
          <EventScheduler schedules={formData.schedules} onScheduleUpdate={(updatedSchedules) => setFormData({ ...formData, schedules: updatedSchedules })} />
        </div>

        <div className="col-span-full xl:col-auto">
          {/* Event Logistics */}
          <div className="bg-white p-3 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Event Logistics</h3>
            {/* Audience Selector */}
            <AudienceSelector formData={formData} onSelect={(audience) => setFormData({ ...formData, audience: audience })} />

            {/* Event Plans for events templates */}
            {formData.eventTemplate && (
              <div className="col-span-full mb-3">
                <Label htmlFor="eventTemplate" value="Select a Plan" />
                <div className="flex overflow-x-auto pt-2 gap-2">
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
            )}
            {/* Services */}
            <ServicesSelector services={formData.services} onServiceSelect={(selectedServices) => { setFormData((prevData) => ({ ...prevData, services: selectedServices, })); }} />

          </div>

          {/* Order summary */}
          <div className="col-span-full xl:col-auto mt-3 bg-white p-3 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <OrderSummary formData={formData} />
          </div>
        </div>


        <div className="col-span-full bg-white p-3 rounded-lg shadow-sm dark:bg-gray-800">
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
      <CreateEventContent session={session} />
    </Suspense>
  );
};

export default CreateEvent;
