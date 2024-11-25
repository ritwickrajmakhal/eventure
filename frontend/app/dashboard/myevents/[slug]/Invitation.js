"use client";
import ParticipantQRCode from "@/components/ParticipantQRCode";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";

const Invitation = ({ eventData,handleBackInvitation }) => {
  console.log(eventData);

  const [session, setSession] = useState(
    Cookies.get("session") ? JSON.parse(Cookies.get("session")) : null
  );

  const { name, description, status, venue, schedules, services, audiences } =
    eventData.attributes;

  const [formData, setFormData] = useState({
    audiences: eventData.attributes.audiences,
    heading: "",
    salutation: "",
    body: "",
    closing_statement: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const participantData = {
    id: "123",
    name: "John Doe",
  };

  if (session) {
    return (
      <>
        <div className="flex justify-center ">
          <div className="text-white flex flex-col gap-5">
            <h1 className="text-2xl font-bold">
              Invitation card will look like this -{" "}
            </h1>

            <div className="form">
              <form class="max-w-sm mx-auto">
                <div class="mb-5">
                  <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Heading
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                    id="heading"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Invites You to Join Us ..."
                    required
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Salutation
                  </label>
                  <input
                    type="text"
                    name="salutation"
                    value={formData.salutation}
                    onChange={handleChange}
                    id="salutation"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                    placeholder="Dear/Sir/Maam etc"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="body"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Write body
                  </label>
                  <textarea
                    id="message"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your invitation body ..."
                  ></textarea>
                </div>
                <div class="mb-5">
                  <label
                    for="body"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Closing statement
                  </label>
                  <textarea
                    id="message"
                    name="closing_statement"
                    value={formData.closing_statement}
                    onChange={handleChange}
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your closing statement ..."
                  ></textarea>
                </div>

                <div class="flex items-start mb-5">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    for="terms"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      class="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                  </label>
                </div>
                <div className="button flex gap-3">
                  <button
                  onClick={handleBackInvitation}
                    type="back"
                    class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-500 "
                  >
                    Back to privious
                  </button>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sent Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center text-white">
            <div className="w-[550px] border bg-gray-700 p-6 rounded-md">
              <div className=" space-y-4">
                {/* Invitation Text */}
                <p className="text-center font-bold text-lg tracking-wider">
                  {formData.heading ||
                    "[ Invites You to Join Us at Trade Show ]"}
                </p>
                <div className="flex gap-2 items-center">
                  <p className="text-sm">{formData.salutation || "Dear"},</p>
                  <p className="text-md">John Dey</p>
                </div>
                <p>
                  {formData.body ||
                    "[ We are excited to invite you to join us at Trade Show Nameone of the industrys most anticipated events. Come and explorethe latest innovations in Industry or Products meet our expert team and discover how we can help you achieve your goals. ]"}
                </p>

                {/* Event Details */}
                <div>
                  <h2 className="mb-2">Event Details:</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <Image
                        src="/date.svg"
                        alt="date"
                        width={23}
                        height={25}
                      />
                      Date:{" "}
                      {new Date(
                        schedules.data[0].attributes.start
                      ).toLocaleDateString()}
                    </div>
                    <div className="flex gap-3">
                      <Image
                        src="/time.svg"
                        alt="date"
                        width={23}
                        height={25}
                      />
                      Time:{" "}
                      {new Date(
                        schedules.data[0].attributes.start
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                    <div className="flex gap-3">
                      <Image
                        src="/venue.svg"
                        alt="date"
                        width={23}
                        height={25}
                      />
                      Venue: {venue.data.attributes.name}
                    </div>
                    <div className="flex gap-3">
                      <Image
                        src="/location.svg"
                        alt="date"
                        width={23}
                        height={25}
                      />
                      Location: {venue.data.attributes.address}
                    </div>
                    <div className="flex gap-3">
                      <Image
                        src="/navigation.svg"
                        alt="date"
                        width={23}
                        height={25}
                      />
                      Vavigation: View on map
                    </div>
                  </div>
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
                  {formData.closing_statement ||
                    "We look forward to meeting you and discussing how our solutions can benefit your business. Don’t miss this chance to stay ahead in the industry."}
                </p>
                <p>RSVP by [RSVP Date] at [RSVP Contact Info].</p>
                <p>[Your Company Name]</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Invitation;
