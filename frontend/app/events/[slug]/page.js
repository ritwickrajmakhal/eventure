import CustomerReview from "@/components/CustomerReview";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Help1 from "@/components/Help1";
import Help2 from "@/components/Help2";
import Plan from "@/components/Plan";
import request from "@/lib/request";
import { Button } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const res = await request(
    `/api/event-templates?populate=plans.services&filters[slug][$eq]=${params.slug}&populate=our_helps.image&populate=image&populate=customer_reviews.profilePic`
  );
  if (res.data.length === 0) {
    notFound();
  }
  const eventData = res.data[0];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  return (
    <div className="text-white w-4/5 m-auto">
      {/* Heading part */}
      <div className="heading pt-8 pb-5">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Let&apos;s Organize{" "}
          <mark class="px-2  text-white bg-blue-900 rounded dark:bg-gray-700">
            {params.slug}
          </mark>{" "}
          . . .
        </h1>
      </div>

      <div className="gallery py-5 flex flex-wrap gap-5 justify-center">
        {eventData?.attributes.image.data.slice(0, 6).map((img, index) => (
          <Gallery key={index} img={apiUrl + img.attributes.url} />
        ))}
      </div>

      <div className="customerReview mt-8">
        <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
          {eventData?.attributes.customer_reviews.data
            .slice(0, 4)
            .map((data, index) => (
              <CustomerReview
                key={index}
                subject={data.attributes.Subject}
                description={data.attributes.Description}
                profilePic={
                  (process.env.NEXT_PUBLIC_API_URL || "") +
                  data.attributes.profilePic.data.attributes.url
                }
                userName={data.attributes.userName}
              />
            ))}
        </div>
      </div>

      {/* Help Section */}
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Heres how
        </span>{" "}
        we can help you...
      </h1>
      <div className="help-section">
        {eventData?.attributes.our_helps?.data.map((data, index) => {
          const Component = index % 2 === 0 ? Help1 : Help2;
          return (
            <Component
              key={index}
              title={data.attributes.title}
              description={data.attributes.description}
              img={apiUrl + data.attributes.image.data.attributes.url}
            />
          );
        })}
      </div>

      {/* Plan Section */}
      <div className="plan-section mb-10">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Select your
          </span>{" "}
          Plan
        </h1>
        <div className="flex justify-between w-5/6 m-auto overflow-auto gap-3">
          {eventData?.attributes.plans.map((plan, index) => (
            <Plan
              key={index}
              slug={params.slug}
              premiumServices={eventData?.attributes.plans.find((p) => p.type === "Premium").services.data}
              services={plan.services.data}
              type={plan.type}
            />
          ))}
        </div>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center">
        <Button as={Link} href={`/events/create?template=${params.slug}`}>
          <HiFire className="mr-2 h-5 w-5" />
          Book Now
        </Button>
      </div>
    </div>
  );
}