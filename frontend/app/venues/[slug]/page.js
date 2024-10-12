import request from "@/lib/request";
import { notFound } from "next/navigation";
import { Badge, Button, Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }) => {
  const res = await request(`/api/venues?filters[slug][$eq]=${params.slug}&populate=*`);
  if (res.data.length === 0) {
    notFound();
  }
  const venueData = res.data[0];
  const {
    name,
    description,
    area,
    capacity,
    map,
    bookingCost,
    amenities,
    media,
  } = venueData.attributes;

  // Prepare the Google Maps URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${map.coordinates.lat},${map.coordinates.lng}&zoom=14&maptype=satellite`;

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-md">
      {/* Venue Overview */}
      <div className="bg-white p-6 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-4">{name}</h1>
        <p className="text-gray-700 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge color="purple">Area: {area} sq. ft</Badge>
          <Badge color="blue">Capacity: {capacity} people</Badge>
          <Badge color="green">₹{bookingCost} per booking</Badge>
        </div>
      </div>

      {/* Media Carousel */}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-6">
        <Carousel pauseOnHover>
          {media.data?.map((mediaItem) => {
            const { id, attributes: { alternativeText, url, mime } } = mediaItem;
            return mime.startsWith("image/") ? (
              <Image
                key={id}
                src={`${process.env.NEXT_PUBLIC_API_URL || ""}${url}`}
                alt={alternativeText || "Venue Image"}
                width={600}
                height={400}
                layout="responsive"
                objectFit="cover"
                className="rounded-lg"
              />
            ) : (<video
              key={id}
              autoPlay
              loop
              muted
              className="w-full h-full rounded-lg object-cover"
            >
              <source src={`${process.env.NEXT_PUBLIC_API_URL || ""}${url}`} type={mime} />
              Your browser does not support the video tag.
            </video>);
          })}
        </Carousel>
      </div>

      {/* Venue Location */}
      <div className="bg-white p-6 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-700 mb-6">
        <h3 className="text-xl font-semibold dark:text-white mb-2">Location</h3>
        <p className="text-gray-700 dark:text-gray-400 mb-4">{map.address}</p>
        <div className="w-full h-96 border rounded-lg">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white p-6 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-700 mb-6">
        <h3 className="text-xl font-semibold dark:text-white mb-2">Amenities</h3>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {amenities.map((amenity, index) => <Badge key={index} color="info">{amenity.title}</Badge>)}
        </div>
      </div>

      {/* Booking Buttons */}
      <div className="flex justify-center space-x-4">
        <Button as={Link} href={`/events/create?venue=${params.slug}`} color="success" className="px-4 py-2 rounded-lg text-white">Book Now</Button>
        <Button as={Link} href="/venues" color="failure" className="px-4 py-2 rounded-lg text-white">Cancel</Button>
      </div>
    </div>
  );
};

export default page;