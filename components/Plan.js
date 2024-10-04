import Link from "next/link";
import React from "react";
import { HiBadgeCheck } from "react-icons/hi";

const Plan = ({ slug, type, services, premiumServices, planSelected }) => {
  const unavailableServices = premiumServices.filter(
    (premium) => !services.some((service) => service.id === premium.id)
  );
  const totalCost = services.reduce((acc, { attributes }) => acc + attributes.cost, 0);

  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{type}</h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">₹</span>
        <span className="text-5xl font-extrabold">{totalCost}</span>
        <span className="ms-1 text-xl text-gray-500 dark:text-gray-400">/hrs</span>
      </div>
      <ul className="space-y-5 my-7">
        {services.map(({ attributes }, index) => (
          <li className="flex items-center" key={index}>
            <HiBadgeCheck className="w-5 h-5 text-blue-700 dark:text-blue-500" />
            <span className="ms-3 text-base text-gray-500 dark:text-gray-400">{attributes.title}</span>
          </li>
        ))}
        {unavailableServices.map(({ attributes }, index) => (
          <li className="flex items-center line-through" key={index}>
            <HiBadgeCheck className="w-5 h-5 text-gray-700 dark:text-gray-500" />
            <span className="ms-3 text-base text-gray-500 dark:text-gray-400">{attributes.title}</span>
          </li>
        ))}
      </ul>
      <Link href={`/events/create?template=${slug}${planSelected ? "" : `&plan=${type}`}`}>
        <button
          type="button"
          className={`text-white ${planSelected ? "bg-red-700 hover:bg-red-800" : "bg-blue-700 hover:bg-blue-800"} 
            focus:ring-4 focus:outline-none focus:ring-${planSelected ? "red" : "blue"}-200 
            dark:bg-${planSelected ? "red" : "blue"}-600 dark:hover:bg-${planSelected ? "red" : "blue"}-700 
            dark:focus:ring-${planSelected ? "red" : "blue"}-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full`}
        >
          {planSelected ? "Remove Plan" : "Choose plan"}
        </button>
      </Link>
    </div>
  );
};

export default Plan;