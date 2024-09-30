import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Label } from "flowbite-react";
import request from "@/lib/request";

const animatedComponents = makeAnimated();

const ServicesSelector = ({ services, onServiceSelect }) => {
  const [allServices, setAllServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch services from the API
  useEffect(() => {
    const fetchData = async () => {
      const res = await request("/api/services");
      setAllServices(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Prepare options for react-select dropdown
  const options = allServices.map(({ id, attributes: { title, cost } }) => ({
    value: id,
    label: `${title} (${cost} USD)`,
  }));

  // Handle selection change
  const handleChange = (selectedOptions) =>
    onServiceSelect(selectedOptions ? selectedOptions.map(({ value }) => value) : []);

  // Set selected services as react-select values
  const selectedOptions = services
    .map((serviceId) =>
      allServices.find(({ id }) => id === serviceId)
    )
    .filter(Boolean)
    .map(({ id, attributes: { title } }) => ({ value: id, label: title }));

  return (
    <div className="col-span-full mb-3">
      <Label className="text-lg mb-2 block" htmlFor="services" value="Select the services you need" />
      <Select
        isMulti
        closeMenuOnSelect={false}
        components={animatedComponents}
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        isLoading={isLoading}
        isSearchable={true}
        isClearable={true}
        placeholder="Select services"
        className="text-black"
      />
    </div>
  );
};

export default ServicesSelector;