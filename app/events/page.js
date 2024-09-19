"use client";
import { React, useEffect, useState } from "react";
import Link from "next/link";
import request from "@/lib/request";
import Image from "next/image";

const Page = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await request(
          "/api/event-templates?populate=*&sort=id"
        );

        if (response.error) {
          console.log(response.error);
        } else {
          let newCardData = [...cardData];
          for (const i of response.data) {
            newCardData.push({
              id: i.id,
              img: `${process.env.NEXT_PUBLIC_API_URL || ""}${
                i.attributes.image.data[0].attributes.url
              }`,
              heading: i.attributes.title,
              paragraph: i.attributes.description,
              slug: i.attributes.slug,
            });
          }
          setCardData(newCardData);
          console.log(cardData);
          
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="text-white w-4/5 m-auto flex flex-col justify-center items-center">
      {/* 1st row */}
      <div className="fearures flex flex-wrap mt-5 mb-5 md:flex-row flex-col items-center gap-5 md:gap-5">
        {cardData.slice(0, cardData.length).map((data, index) => (
          <Card
            key={index}
            className={data.slug}
            img={data.img}
            heading={data.heading}
            paragraph={data.paragraph}
          />
        ))}
        <Card
          className={"custom"}
          img={"/custom.jpg"}
          heading={"Create Custom "}
          paragraph={
            "Create your own event and collaborate with us and organize a grate event. Click Continue to procide..."
          }
        />
      </div>
    </div>
  );
};

function Card({ className, img, heading, paragraph }) {
  return (
    <div className={className}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`./event/${className}`}>
          <Image
            className="rounded-t-lg"
            src={img}
            alt="image"
            width={500}
            height={250}
          />
        </Link>
        <div className="p-5">
          <Link href={`./event/${className}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {heading}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {paragraph}
          </p>
          <Link
            href={`./event/${className}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Contunue
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
    </div>
  );
}
export default Page;
