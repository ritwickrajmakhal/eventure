import React from "react";

const Amenities = ({ ami }) => {
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

        <div className="flex items-center">
          <i className="fas fa-check text-green-500 mr-2"></i>
          <p>{ami}</p>
        </div>
      </>
    </div>
  );
};

export default Amenities;
