"use client";
import CustomerReview from "@/components/CustomerReview";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Help1 from "@/components/Help1";
import Help2 from "@/components/Help2";
import Plan from "@/components/Plan";
import { React, useEffect, useState } from "react";
import request from "@/lib/request";

export default function Page({ params }) {
  const [eventData, setEventData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await request(
          `/api/event-templates?populate=plans.services&filters[slug][$eq]=${params.slug}&populate=our_helps.image&populate=image&populate=customer_reviews.profilePic&populate=profilePic`
        );

        if (response.error) {
          console.log(response.error);
        } else {
          setEventData(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [params]);

  return (
    <div className="text-white w-4/5 m-auto">
      <div className="gallery my-5 flex flex-wrap mt-5 md:flex-row flex-col items-center gap-5 md:gap-5">
        {eventData?.attributes.image.data.slice(1).map((img, index) => (
          <Gallery
            key={index}
            img={(process.env.NEXT_PUBLIC_API_URL || "") + img.attributes.url}
          />
        ))}
      </div>

      <div className="customerReview  my-5">
      <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">

        {eventData?.attributes.customer_reviews.data.slice(0,4).map((data, index) => (
          <CustomerReview
          key={index}
            subject={data.attributes.Subject}
            description={data.attributes.Description}
            profilePic={
              (process.env.NEXT_PUBLIC_API_URL || "") +
              data.attributes.profilePic.data.attributes.url
            }
            userName={data.attributes.userName}
          />
        ))}
        </div>
      </div>

      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Heres how
        </span>{" "}
        we can help you...
      </h1>

      <div className="first ">
        {eventData?.attributes.our_helps.data.map((data, index) =>
          index % 2 === 0 ? (
            <Help1
              key={index}
              title={data.attributes.title}
              description={data.attributes.description}
              img={`${process.env.NEXT_PUBLIC_API_URL || ""}${
                data.attributes.image.data.attributes.url
              }`}
            />
          ) : (
            <Help2
              key={index}
              title={data.attributes.title}
              description={data.attributes.description}
              img={`${process.env.NEXT_PUBLIC_API_URL || ""}${
                data.attributes.image.data.attributes.url
              }`}
            />
          )
        )}
        {/* <Help2 /> */}
      </div>

      <div className="plan mb-10">
        <div className="m-10">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Select your
            </span>{" "}
            Plan
          </h1>
        </div>

        <div className="flex justify-between w-5/6 m-auto">
          {eventData?.attributes.plans.map((plan, index) => (
            <Plan
              key={index}
              price={plan.price}
              allServices={
                eventData?.attributes.plans[
                  eventData?.attributes.plans.length - 1
                ].services.data
              }
              services={plan.services.data}
              type={plan.type}
            />
          ))}
        </div>
      </div>

      <div className="createCustom flex justify-center align-middle items-center m-12">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create your own plan as per your requerment.
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <Link
            href="/createevent"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Now
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="calendar">{/* TODO */}</div>
    </div>
  );
}
