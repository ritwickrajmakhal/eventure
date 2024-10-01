import { Select, Label } from "flowbite-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import request from "@/lib/request";

const AudienceSelector = ({ formData, onSelect }) => {
  const [session, setSession] = useState(null);
  const [audiences, setAudiences] = useState([]);
  const userCookie = Cookies.get("session");

  useEffect(() => {
    if (userCookie) setSession(JSON.parse(userCookie));
  }, [userCookie]);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const aud = await request(`/api/audiences?filters[user][$eq]=${session.id}`, {
          headers: { Authorization: `Bearer ${session.jwt}` },
        });
        setAudiences(aud.data);
      };
      fetchData();
    }
  }, [session]);

  return (
    <div className="mb-3">
      {/* Label and Link for creating a new audience */}
      <div className="mb-2 block">
        <Label className="text-lg" htmlFor="audience" value="Target Audience - Don't have one? " />
        <Link href="/dashboard/audiences" className="hover:underline dark:text-blue-500 text-lg">
          create one
        </Link>
      </div>
      
      {/* Audience dropdown */}
      <Select
        id="audience"
        required
        value={formData.audience?.id || ""}
        onChange={(e) => onSelect(audiences.find((aud) => aud.id == e.target.value))}
      >
        <option value="">Select an audience</option>
        {audiences?.map((audience) => {
          const { id, attributes: { name, details } } = audience;
          return (
            <option key={id} value={id}>
              {`${name} (${details.length} participants)`}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default AudienceSelector;