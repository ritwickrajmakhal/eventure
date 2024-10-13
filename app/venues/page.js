import React from "react";
import request from "@/lib/request";
import Card3 from "./Card3";

const page = async () => {
  const res = await request("/api/venues?populate=thumbnail");
  const venue = res.data;
  
  return (
    <div className="flex justify-center items-center gap-5 flex-wrap">
      {venue.map((venue, index) => {
        const { thumbnail, name, description, map: {address}, slug } = venue.attributes;

        return (
          <Card3
            key={index}
            thumbnail={`${process.env.NEXT_PUBLIC_API_URL || ""}${
              thumbnail?.data.attributes?.url
            }`}
            name={name}
            description={description}
            street_address={address}
            slug={slug}
          />
        );
      })}
    </div>
  );
};

export default page;
