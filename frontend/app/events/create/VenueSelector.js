import { Label } from "flowbite-react";
import Card from "./Card";
import "../style.css";
import { useState, useEffect } from "react";
import request from "@/lib/request";

const VenueSelector = ({ selectedVenue, onSelectVenue }) => {
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const venues = await request("/api/venues?populate=thumbnail");
      setVenues(venues.data);
    };
    fetchData();
  }, []);

  return (
    <div className="col-span-full mb-3">
      <div className="mb-2 block">
        {/* Label for Venue Selection */}
        <Label className="text-lg" htmlFor="venue" value="Select a venue" />
        
        {/* Render selected venue or all venues */}
        {selectedVenue ? (
          <Card
            id={selectedVenue.id}
            title={selectedVenue.attributes.name}
            description={selectedVenue.attributes.description}
            image={`${process.env.NEXT_PUBLIC_API_URL || ""}${
              selectedVenue.attributes.thumbnail.data.attributes.url
            }`}
            onSelect={() => onSelectVenue(null)}
            isSelected={true}
          />
        ) : (
          <div className="flex overflow-x-auto space-x-4 pt-2">
            {/* Render all available venues */}
            {venues?.map((venue) => {
              const { id, attributes: { name, description, thumbnail } } = venue;
              const isSelected = selectedVenue?.id === id;

              return (
                <Card
                  key={id}
                  id={id}
                  title={name}
                  description={description}
                  image={`${process.env.NEXT_PUBLIC_API_URL || ""}${thumbnail.data.attributes.url}`}
                  onSelect={() => onSelectVenue(venue)}
                  isSelected={isSelected}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueSelector;
