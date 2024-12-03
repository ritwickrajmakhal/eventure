"use client";

import React, { useState, useEffect, useRef } from "react";
import request from "@/lib/request";
import Card3 from "./Card3";
import debounce from "lodash.debounce"; // Import debounce function

const Page = () => {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const observer = useRef(null);
  const lastElementRef = useRef(null);

  // Fetch venues from API
  const fetchVenues = async (reset = false) => {
    if (isLoading || (!reset && !hasMore)) return;

    setIsLoading(true);

    try {
      const res = await request(
        `/api/venues?populate=thumbnail&pagination[page]=${page}&pagination[pageSize]=10&filters[name][$containsi]=${encodeURIComponent(
          searchQuery
        )}`
      );
      const newVenues = res.data;

      if (newVenues.length === 0) {
        setHasMore(false); // No more items to fetch
      } else {
        setVenues((prev) => {
          const existingSlugs = reset ? [] : prev.map((item) => item.attributes.slug);
          const filteredVenues = newVenues.filter((item) => !existingSlugs.includes(item.attributes.slug));
          return reset ? filteredVenues : [...prev, ...filteredVenues];
        });
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    setPage(1);
    setHasMore(true);
    fetchVenues(true);
  }, 500);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Observe last element for infinite scroll
  useEffect(() => {
    if (!lastElementRef.current || !hasMore || isLoading) return;

    const options = { root: null, rootMargin: "0px", threshold: 1.0 };
    const observerCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1); // Trigger next page fetch
      }
    };

    observer.current = new IntersectionObserver(observerCallback, options);
    observer.current.observe(lastElementRef.current);

    // Cleanup observer on unmount or dependency change
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, isLoading]);

  // Fetch venues whenever the page changes
  useEffect(() => {
    fetchVenues();
  }, [page]);

  return (
    <>
      <h1 className="text-5xl font-extrabold text-center my-5 bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-red-500">
        Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400">Venues</span>
      </h1>

      <div className="mb-6 flex justify-center">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search venues..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-5 flex-wrap px-2">
        {venues.map((venue) => {
          const { thumbnail, name, description, map: { address }, slug } = venue.attributes;

          return (
            <Card3
              key={slug} // Use a unique key like slug
              thumbnail={`${process.env.NEXT_PUBLIC_API_URL || ""}${thumbnail?.data.attributes?.url}`}
              name={name}
              description={description}
              street_address={address}
              slug={slug}
            />
          );
        })}
      </div>

      {hasMore && <div id="load-more-trigger" ref={lastElementRef} className="h-10 mt-10"></div>}

      {isLoading && <p className="text-center text-gray-500">Loading more venues...</p>}

      {!hasMore && !isLoading && (
        <p className="text-center text-gray-500 mt-5">You have reached the end of the list.</p>
      )}
    </>
  );
};

export default Page;