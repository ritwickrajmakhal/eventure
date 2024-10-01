import { Label } from "flowbite-react";
import Card from "./Card";
import "../style.css";
import { useState, useEffect } from "react";
import request from "@/lib/request";

const VenueSelector = ({ formData, onSelectVenue }) => {
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
        {formData.venue ? (
          <Card
            id={formData.venue.id}
            title={formData.venue.attributes.name}
            description={formData.venue.attributes.description}
            image={`${process.env.NEXT_PUBLIC_API_URL || ""}${
              formData.venue.attributes.thumbnail.data.attributes.url
            }`}
            onSelect={() => onSelectVenue(null)}
            isSelected={true}
          />
        ) : (
          <div className="flex overflow-x-auto space-x-4 pt-2">
            {/* Render all available venues */}
            {venues?.map((venue) => {
              const { id, attributes: { name, description, thumbnail } } = venue;
              const isSelected = formData.venue?.id === id;

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
