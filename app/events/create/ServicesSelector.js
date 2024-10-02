import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Label } from "flowbite-react";
import request from "@/lib/request";

const animatedComponents = makeAnimated();

const ServicesSelector = ({ services, onServiceSelect }) => {
  const [allServices, setAllServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Add this state to handle client-side rendering

  // Fetch services from the API
  useEffect(() => {
    const fetchData = async () => {
      const res = await request("/api/services");
      setAllServices(res.data);
      setIsLoading(false);      
    };
    fetchData();
  }, []);

  // Ensure that the component only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prepare options for react-select dropdown
  const options = allServices.map(({ id, attributes: { title, cost } }) => ({
    value: id,
    label: `${title} (₹${cost})`,
  }));

  // Handle selection change
  const handleChange = (selectedOptions) =>
    onServiceSelect(allServices.filter(({ id }) => selectedOptions.some((option) => option.value === id)));

  // Set selected services as react-select values
  const selectedOptions = services.map(({id}) => options.find((option) => option.value === id));
  if (!isClient) return null; // Render nothing on the server

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