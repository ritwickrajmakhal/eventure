import request from "@/lib/request";
import Gallery from "../Gallery";
import Amenities from "../Amenities";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const res = await request(
    `/api/venues?filters[slug][$eq]=${params.slug}&populate=*`
  );
  if(res.data.length === 0) {
    notFound();
  }
  const venueData = res.data[0];
  const {
    id,
    attributes: {
      name,
      media,
      category,
      description,
      area,
      capacity,
      map,
      bookingCost,
      amenities,
    },
  } = venueData;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${map.coordinates.lat},${map.coordinates.lng}&zoom=14&maptype=satellite`;
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <>
        <Link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <Link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <div className="max-w-7xl mx-auto ">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-blue-600 mb-3">{name}</h1>
            <div className="flex">
              <div className="w-2/3">
                <div className="flex flex-wrap gap-2">
                  {media.data.slice(0, 2).map((image, index) => {
                    const { url } = image.attributes;
                    return (
                      <Gallery
                        key={index}
                        media={`${process.env.NEXT_PUBLIC_API_URL || ""}${url}`}
                      />
                    );
                  })}
                </div>
                <p className="mt-4 text-lg font-bold">{category}</p>
                <p>{description}</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-door-open mr-2"></i>
                  <p>{area} sq feet hall room</p>
                  <i className="fas fa-users ml-4 mr-2"></i>
                  <p>Holds more than {capacity} people</p>
                </div>
                <p className="mt-4 text-lg font-bold">Amenities</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {amenities.map((data, index) => {
                    const { title } = data;
                    return <Amenities key={index} ami={title} />;
                  })}
                </div>
              </div>
              <div className="w-1/3 pl-4">
                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                  <div className="flex items-center">
                    <div className="ml-2">
                      <p className="font-bold">Address</p>
                      {map.address}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-blue-600 text-2xl"></i>
                    <div className="ml-2">
                      <p className="font-bold">Location</p>
                      <Link href={"#gmap"}>
                        <p className="text-blue-600">See on Map</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                  <p className="font-bold">Booking Cost(~)</p>
                  <p className="text-green-600 font-bold">$ {bookingCost}</p>
                </div>
                <div className="book flex justify-center items-center m-8">
                  <button
                    type="button"
                    className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                  >
                    Book Now
                  </button>
                  <button
                    type="button"
                    className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                  >
                    Cut Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <div id="gmap" className="map w-4/6 mb-5 border-2 border-gray-700 rounded-lg">
        <iframe
          width="100%"
          height="400"
          id="map"
          src={mapUrl}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </div>
    </div>
  );
};

export default page;
