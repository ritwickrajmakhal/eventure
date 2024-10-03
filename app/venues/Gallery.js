import React from "react";
import Image from "next/image";

const Gallery = ({media}) => {
  return (
    <div>
      <>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <div className="">
          <Image
            alt="Swimming pool at night with surrounding buildings"
            className="rounded-md"
            height={0}
            src={media}
            width={355}
          />
        </div>
      </>
    </div>
  );
};

export default Gallery;
