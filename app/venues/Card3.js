import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card3 = ({ thumbnail, name, description, street_address, slug }) => {
  return (
    <div>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        rel="stylesheet"
      />
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden ">
        <div className="flex">
          <div className="w-2/4">
            <Image
              alt="Hotel The Venue building with lights at night"
              className="w-full h-full object-cover"
              height={200}
              src={thumbnail}
              width={300}
            />
          </div>
          <div className="w-2/3 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  {name}
                </h2>
              </div>
            </div>
            <p className="mt-3 text-gray-700">
              {description}
            </p>
            <div className="location mt-3 font-bold">
              <p>{street_address}</p>
            </div>
            <div className="mt-4 ">
              <Link href={`/venues/${slug}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  View in detail
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3;
