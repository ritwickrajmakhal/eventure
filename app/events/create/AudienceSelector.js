import { Label } from "flowbite-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import request from "@/lib/request";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const AudienceSelector = ({ audiences, onAudienceSelect }) => {
  const [session, setSession] = useState(null);
  const [allAudiences, setAllAudiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userCookie = Cookies.get("session");
  const [isClient, setIsClient] = useState(false); // Add this state to handle client-side rendering

  useEffect(() => {
    if (userCookie) setSession(JSON.parse(userCookie));
  }, [userCookie]);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const aud = await request(`/api/audiences?filters[user][$eq]=${session.id}`, {
          headers: { Authorization: `Bearer ${session.jwt}` },
        });
        setAllAudiences(aud.data);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [session]);

  // Ensure that the component only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prepare options for react-select dropdown
  const options = allAudiences.map(({ id, attributes: { name, details } }) => ({
    value: id,
    label: `${name} (${details.length} participants)`
  }));

  // Handle selection change
  const handleChange = (selectedOptions) =>
    onAudienceSelect(allAudiences.filter(({ id }) => selectedOptions.some((option) => option.value === id)));

  // Set selected services as react-select values
  const selectedOptions = audiences.map(({ id }) => options.find((option) => option.value === id));
  if (!isClient) return null; // Render nothing on the server

  return (
    <div className="mb-3">
      {/* Label and Link for creating a new audience */}
      <div className="mb-2 block">
        <Label className="text-lg" htmlFor="audience" value="Target Audience - Don't have one? " />
        <Link href="/dashboard/audiences?showImportModal=true" className="hover:underline dark:text-blue-500 text-lg">
          create one
        </Link>
      </div>

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
        placeholder="Select audiences"
        className="text-black"
      />
    </div>
  );
};

export default AudienceSelector;