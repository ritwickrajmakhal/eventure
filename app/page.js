import Card1 from "@/components/Card1";
import React from "react";
import Link from "next/link";

function page() {
  const cardData = [
    {
      className: "eventCreation",
      heading: "Easy Event Creation",
      paragraph:
        "Eventure allows organizers to effortlessly set up events. This streamlined approach ensures that even users with minimal technical skills can quickly create and manage events.",
    },
    {
      className: "Invitation",
      heading: "Invitation",
      paragraph:
        "This platform enables organizers to send personalized digital invitations to participants. Each invitation includes a unique QR code for secure and streamlined entry management.",
    },
    {
      className: "QRCodeManagement",
      heading: "QR Code Management",
      paragraph:
        "The QR Code Management system provides each participant with a unique QR code for event entry. This ensures secure access and real-time tracking of attendees.",
    },
    {
      className: "RealTimeParticipantTracking",
      heading: "Real-Time Participant Tracking",
      paragraph:
        "The platform offers real-time participant tracking, allowing organizers to monitor attendance and engagement instantly. This feature provides valuable insights.",
    },
    {
      className: "SecureAccessManagement",
      heading: "Secure Access Management",
      paragraph:
        "This ensures only authorized participants enter events by verifying unique QR codes. This system enhances event security and prevents unauthorized access",
    },
  ];
  return (
    <>
      <div className="text-white">
        <div className="md:text-7xl text-center font-bold font-Inter mt-8 md:mt-24 text-5xl">
          <h1 className="m-3 md:m-5">Easily Organize your events with</h1>
          <h1 className="text-slate-400"> EVENTURE</h1>
        </div>
        <div className="text-center m-8 md:m-16 text-sm md:text-lg text-slate-100 ">
          <p className="">
            This platform is a user-friendly web interface that simplifies event
            planning and management. It enables organizers to create events,
            send invitations with QR codes, and manage secure entry. Real-time
            tracking allows monitoring of participant attendance, ensuring a
            seamless event experience.
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center md:gap-5 gap-2">
          <Link href="/events">
            <button
              type="button"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Creat a new event
            </button></Link>
          <Link href="/about">
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Learn More</button></Link>
        </div>

        {/* Key features section */}
        <div className="flex flex-col items-center justify-center md:gap-10 ">
          <p className="bg-white h-[1.5px] opacity-10 w-3/4 md:m-10 m-5"></p>

          <div className="fearures flex md:flex-row flex-col items-center gap-5 md:gap-10">
            {cardData.slice(0, 2).map((data, index) => (
              <Card1
                key={index}
                className={data.className}
                heading={data.heading}
                paragraph={data.paragraph}
              />
            ))}
          </div>

          <div className="fearures flex md:flex-row flex-col items-center gap-5 md:gap-10 mt-5">
            {cardData.slice(2, 5).map((data, index) => (
              <Card1
                key={index}
                className={data.className}
                heading={data.heading}
                paragraph={data.paragraph}
              />
            ))}
          </div>
          <p className="bg-white h-[1.5px] opacity-10 w-3/4 md:m-10 m-5"></p>
        </div>
        {/* Feature section end here */}
      </div>
    </>
  );
}

export default page;
