"use client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import request from "@/lib/request";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { convertToJSON } from "@/lib/convertToJSON";
import { HiOutlineArrowRight } from "react-icons/hi";
import Link from "next/link";
import ImportModal from "./ImportModal";

// Validate and filter JSON data to ensure it has required fields
const validateAndFilterJsonData = (jsonDetails) => {
  const requiredFields = ["email", "name"];
  if (!Array.isArray(jsonDetails) || jsonDetails.length === 0) {
    throw new Error("JSON data should be a non-empty array.");
  }
  const hasValidFields = obj =>
    requiredFields.every(field => Object.keys(obj).some(key => key.toLowerCase() === field && obj[key]?.trim()));
  const validEntries = jsonDetails.filter(hasValidFields);
  if (validEntries.length === 0) {
    throw new Error("No valid entries found. Each entry must have both 'email' and 'name' fields.");
  }
  return validEntries;
};

const Page = () => {
  const [session, setSession] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", desc: "", details: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audiences, setAudiences] = useState([]);

  // Get user session from cookie on page load
  useEffect(() => {
    const userCookie = Cookies.get("session");
    if (userCookie) {
      setSession(JSON.parse(userCookie));
    }
  }, []);

  // Fetch audiences on page load and when session changes 
  useEffect(() => {
    if (session) {
      const fetchAudiences = async () => {
        const res = await request(`/api/audiences?filters[user][$eq]=${session.id}`, {
          headers: { Authorization: `Bearer ${session.jwt}` },
        });
        if (res.data) setAudiences(res.data);
      };
      fetchAudiences();
    }
  }, [session]);

  // Close modal and reset form data when modal is closed
  const closeModal = () => {
    setOpenModal(false);
    setFormData({ name: "", desc: "", details: null });
    setError(null);
    setLoading(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // Create audience and save to database when form is submitted
  const createAudience = async (e) => {
    e.preventDefault();
    setLoading(true);
    let validDetails;
    try {
      if (formData.details) {
        const jsonDetails = await convertToJSON(formData.details);
        validDetails = validateAndFilterJsonData(jsonDetails);
      }
      else{
        validDetails = [{"name": "", "email": ""}];
      }
      const requestBody = {
        data: {
          slug: uuidv4(),
          name: formData.name,
          user: session.id,
          desc: formData.desc,
          details: validDetails,
        },
      };
      const res = await request("/api/audiences", {
        method: "POST",
        body: requestBody,
        headers: { Authorization: `Bearer ${session.jwt}` },
      });
      if (res.result) {
        setAudiences(prev => [...prev, res.data]);
        closeModal();
      } else {
        setError(res.error.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Audiences</h1>
        <Button pill color="blue" onClick={() => setOpenModal(true)}>
          <PlusCircleIcon className="mr-2 h-5 w-5" />
          Create
        </Button>
        <ImportModal
          headerLabel={"Create your audience"}
          openModal={openModal}
          closeModal={closeModal}
          handleSubmit={createAudience}
          handleInputChange={handleInputChange}
          formData={formData}
          loading={loading}
          error={error}
        />
      </div>
      <div className="flex gap-4 flex-wrap mt-3 justify-center">
        {audiences.length ? audiences.map((audience, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/6">
            <AudienceCard audience={audience} />
          </div>
        )) : <p>No Audience found</p>}
      </div>
    </div>
  );
};

const AudienceCard = ({ audience }) => {
  const { name, desc, slug } = audience.attributes;
  return (
    <Card className="max-w-full h-full bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
      <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{name}</h5>
      <p className="text-gray-700 dark:text-gray-400 mb-6">{desc || "No description available."}</p>
      <Button as={Link} href={`audiences/${slug}`} color="blue" size="sm" passHref>
        View <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Card>
  );
};

export default Page;
