"use client";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import { Table } from "flowbite-react";
import request from "@/lib/request";
import showToast from "@/lib/toast";

const Invitation = ({ eventData, handleBackInvitation }) => {
  const [session, setSession] = useState(
    Cookies.get("session") ? JSON.parse(Cookies.get("session")) : null
  );

  // Initialize state variables without depending on session
  const [formData, setFormData] = useState(() => {
    // Get session data safely
    const sessionData = Cookies.get("session") ? JSON.parse(Cookies.get("session")) : null;

    return {
      audience: sessionData && eventData?.attributes?.audience || [],
      schedules: sessionData && eventData?.attributes?.schedules || [],
      venue: sessionData && eventData?.attributes?.venue || {},
      heading: "",
      salutation: "",
      body: "",
      closing_statement: "",
    };
  });

  const [sending, setSending] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendInvitation = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await request(`/api/send-invitation/${eventData.id}`, {
        method: "POST",
        body: formData,
      });
      if(res.error) {
        showToast('error', res.error.message || 'Failed to send invitation');
      }
      else {
        showToast('success', 'Invitation sent successfully');
        handleBackInvitation();
      }
      // You might want to add success handling here
    } catch (error) {
      showToast('error', error.message || 'Failed to send invitation');
    } finally {
      setSending(false);
    }
  };
  if (!session) {
    return null; // Return early if there's no session
  }

  // Now we safely access these variables after ensuring session exists
  const { venue, schedules } = eventData.attributes;
  return (
    <>
      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-md flex flex-row gap-6 justify-center flex-wrap">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">
            Invitation card will look like this -{" "}
          </h1>

          <div className="form">
            <form
              className="max-w-sm mx-auto"
              onSubmit={handleSendInvitation}
            >
              <div className="mb-5">
                <label
                  htmlFor="heading"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Heading
                </label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleChange}
                  id="heading"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Invites You to Join Us ..."
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="salutation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Salutation
                </label>
                <input
                  type="text"
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleChange}
                  id="salutation"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  placeholder="Dear/Sir/Ma'am etc"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Write body
                </label>
                <textarea
                  id="message"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your invitation body ..."
                  required
                ></textarea>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Closing statement
                </label>
                <textarea
                  id="message"
                  name="closing_statement"
                  value={formData.closing_statement}
                  onChange={handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your closing statement ..."
                  required
                ></textarea>
              </div>

              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
              <div className="button flex gap-3">
                <button
                  onClick={handleBackInvitation}
                  type="back"
                  className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-500 "
                >
                  Back to privious
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {sending ? 'Sending...' : 'Sent Invitation'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-[550px] border bg-gray-700 p-6 rounded-md md:w-full mt-6">
          <div className=" space-y-4">
            {/* Invitation Text */}
            <p className="text-center font-bold text-lg tracking-wider">
              {formData.heading || "[ Invites You to Join Us at Trade Show ]"}
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-sm">{formData.salutation || "[Salutation]"}</p>
              <p className="text-md">{formData.audience[0].name || "[Name]"}</p>
            </div>
            <p>
              {formData.body ||
                "[Main body of the invitation goes here. You can write a brief about the event and what the audience can expect from it.]"}
            </p>

            {/* Event Details */}
            <div>
              <h2 className="mb-2">Event Details:</h2>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Image src="/venue.svg" alt="date" width={23} height={25} />
                  Venue: {venue.data.attributes.name}
                </div>
                <div className="flex gap-3">
                  <Image
                    src="/location.svg"
                    alt="date"
                    width={23}
                    height={25}
                  />
                  Location: {venue.data.attributes.map.address}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <h2 className="mb-2">Event Schedules:</h2>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Event</Table.HeadCell>
                  <Table.HeadCell>Start</Table.HeadCell>
                  <Table.HeadCell>End</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {schedules?.data.map((schedule) => {
                    const startDate = new Date(schedule.attributes.start).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                    return (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={schedule.id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {schedule.attributes.title}
                        </Table.Cell>
                        <Table.Cell>{startDate}</Table.Cell>
                        <Table.Cell>{startDate}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>

            {/* QR Code */}
            <div className="mt-6 text-center flex flex-col justify-center items-center gap-1">
              <p className=" text-xl">Scan this QR to enter</p>
              <div className="invert border-2 border-black rounded-lg mt-1">
                {/* QR Code Image */}
                <Image
                  src="/qr-code.png" // Assuming you have a QR code saved in the public folder
                  alt="QR Code"
                  width={200}
                  height={100}
                />
                {/* <ParticipantQRCode participant={participantData} /> */}
              </div>
            </div>
            <p>
              {formData.closing_statement || "[Closing statement goes here]"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invitation;
