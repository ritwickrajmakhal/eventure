"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import request from "@/lib/request";

const Page = () => {
  const [eventTemplates, setEventTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const lastElementRef = useRef(null);
  const observer = useRef(null);

  // Fetch data from the API
  const fetchEventTemplates = async ({ query = "", pageNum = 1, reset = false } = {}) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await request(
        `/api/event-templates?populate=*&pagination[page]=${pageNum}&pagination[pageSize]=10&filters[title][$containsi]=${encodeURIComponent(
          query
        )}&sort=id`
      );
      const newTemplates = res.data;

      if (reset) {
        setEventTemplates(newTemplates);
      } else {
        setEventTemplates((prev) => [...prev, ...newTemplates]);
      }

      setHasMore(newTemplates.length > 0);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    setPage(1); // Reset to the first page
    setHasMore(true); // Allow fetching more data
    fetchEventTemplates({ query, pageNum: 1, reset: true });
  };

  // Initial fetch on page load or search reset
  useEffect(() => {
    fetchEventTemplates({ query: searchQuery, pageNum: 1, reset: true });
  }, [searchQuery]);

  // Observe the last element for infinite scrolling
  useEffect(() => {
    if (!hasMore || isLoading || !lastElementRef.current) return;

    const observerCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(observerCallback, { root: null, threshold: 1.0 });
    observer.current.observe(lastElementRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, isLoading]);

  // Fetch more templates when page changes
  useEffect(() => {
    if (page === 1) return; // Avoid re-fetching during initial or search resets
    fetchEventTemplates({ query: searchQuery, pageNum: page });
  }, [page]);

  return (
    <div>
      {/* Page Header */}
      <h1 className="text-5xl font-extrabold text-center my-5 bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-red-500">
        Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400">Events</span>
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Events List */}
      <div className="text-white w-4/5 m-auto flex flex-wrap gap-5 justify-center items-center py-5">
        {/* Default Custom Event Card */}
        <Card
          className="create"
          img="/custom-event.webp"
          heading="Create Custom Event"
          paragraph="Create your own event and collaborate with us and organize a great event. Click Continue to proceed..."
        />

        {/* Render Event Templates */}
        {eventTemplates.map((eventTemplate) => {
          const { slug, image, title, description } = eventTemplate.attributes;

          return (
            <Card
              key={slug}
              className={slug}
              img={`${process.env.NEXT_PUBLIC_API_URL || ""}${image?.data[0]?.attributes?.url}`}
              heading={title}
              paragraph={description}
            />
          );
        })}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && !isLoading && (
        <div ref={lastElementRef} className="h-10 mt-10"></div>
      )}

      {/* Loading Indicator */}
      {isLoading && <p className="text-center text-gray-500">Loading more events...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* End of List */}
      {!hasMore && !isLoading && (
        <p className="text-center text-gray-500 mt-5">You have reached the end of the list.</p>
      )}
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
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{paragraph}</p>
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

export default Page;