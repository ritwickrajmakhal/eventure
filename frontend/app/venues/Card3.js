import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card3 = ({ thumbnail, name, description, street_address, slug }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <Image
            src={thumbnail}
            alt={name}
            width={500}
            height={500}
            objectFit="cover"
          />
        </div>
        {/* Content Section */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="mt-3 text-gray-700">{description}</p>
          <p className="mt-3 font-bold">{street_address}</p>
          <div className="mt-4">
            <Link href={`/venues/${slug}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                View in Detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3;