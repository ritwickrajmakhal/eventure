import { Label } from "flowbite-react";
import Card from "./Card";
import "../style.css";
import { useState, useEffect } from "react";
import request from "@/lib/request";

const EventTemplateSelector = ({ formData, onSelectEventTemplate }) => {
  const [eventTemplates, setEventTemplates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const templates = await request(
        "/api/event-templates?populate=thumbnail,plans,plans.services"
      );
      setEventTemplates(templates.data);
    };
    fetchData();
  }, []);

  return (
    <div className="col-span-full mb-3">
      <div className="mb-2 block">
        {/* Label for Event Template Selection */}
        <Label
          className="text-lg"
          htmlFor="eventTemplate"
          value="Select an event template (optional)"
        />

        {/* Render Selected Template or All Templates */}
        {formData.eventTemplate ? (
          <Card
            id={formData.eventTemplate.id}
            title={formData.eventTemplate.attributes.title}
            description={formData.eventTemplate.attributes.description}
            image={`${process.env.NEXT_PUBLIC_API_URL || ""}${
              formData.eventTemplate.attributes.thumbnail.data.attributes.url
            }`}
            onSelect={() => onSelectEventTemplate(null)}
            isSelected={true}
          />
        ) : (
          <div className="flex overflow-x-auto space-x-4 pt-2">
            {/* Render all available templates */}
            {eventTemplates?.map((template) => {
              const {
                id,
                attributes: { title, description, thumbnail },
              } = template;
              const isSelected = formData.eventTemplate?.id === id;

              return (
                <Card
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  image={`${process.env.NEXT_PUBLIC_API_URL || ""}${
                    thumbnail.data.attributes.url
                  }`}
                  onSelect={() => onSelectEventTemplate(template)}
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

export default EventTemplateSelector;
