import React from "react";
import {Card} from "flowbite-react";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Event Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Events */}
        <Card>
          <h2 className="text-xl font-bold mb-2">Total Events</h2>
          <p className="text-3xl font-semibold">25</p>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-3xl font-semibold">5</p>
        </Card>

        {/* Registered Users */}
        <Card>
          <h2 className="text-xl font-bold mb-2">Registered Users</h2>
          <p className="text-3xl font-semibold">320</p>
        </Card>
      </div>

      {/* Recent Events */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Events</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-bold text-xl">Event Name 1</h3>
          <p>Date: Sept 15, 2024</p>
          <p>Location: New York</p>
        </Card>
        <Card>
          <h3 className="font-bold text-xl">Event Name 2</h3>
          <p>Date: Sept 18, 2024</p>
          <p>Location: Los Angeles</p>
        </Card>
        {/* Add more events as needed */}
      </div>
    </div>
  );
};

export default page;
