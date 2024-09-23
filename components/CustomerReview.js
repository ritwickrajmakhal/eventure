import React from "react";
import Image from "next/image";

const CustomerReview = ({subject,description,profilePic,userName}) => {
  return (
    <div>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {subject}
            </h3>
            <p className="my-4">
              {description}
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center ">
            <Image
              className="rounded-full w-9 h-9"
              src={profilePic}
              alt="profile picture"
              height={0}
              width={500}
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
              <div>{userName}</div>
            </div>
          </figcaption>
        </figure>
      </div>
  );
};

export default CustomerReview;
