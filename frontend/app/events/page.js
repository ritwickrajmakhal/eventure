import Link from "next/link";
import request from "@/lib/request";
import Image from "next/image";

const page = async () => {
  const res = await request("/api/event-templates?populate=*&sort=id");
  const eventTemplates = res.data;

  return (
    <div className="text-white w-4/5 m-auto flex flex-wrap gap-5 justify-center items-center py-5">
      <Card
        className={"create"}
        img={"/custom-event.webp"}
        heading={"Create Custom Event"}
        paragraph={
          "Create your own event and collaborate with us and organize a grate event. Click Continue to proceed..."
        }
      />
      {eventTemplates.map((eventTemplate, index) => {
        const { slug, image, title, description } = eventTemplate.attributes;

        return (
          <Card
            key={index}
            className={slug}
            img={`${process.env.NEXT_PUBLIC_API_URL || ""}${
              image?.data[0].attributes.url
            }`}
            heading={title}
            paragraph={description}
          />
        );
      })}
    </div>
  );
};

function Card({ className, img, heading, paragraph }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/events/${className}`}>
        <Image
          className="rounded-t-lg object-cover h-60"
          src={img}
          alt={heading || "Event Image"}
          width={500}
          height={250}
        />
      </Link>
      <div className="p-5">
        <Link href={`/events/${className}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {heading}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {paragraph}
        </p>
        <Link
          href={`/events/${className}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Continue
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
  );
}

export default page;
