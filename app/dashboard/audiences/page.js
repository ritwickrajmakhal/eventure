"use client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, Suspense } from "react";
import { Button, Table } from "flowbite-react";
import request from "@/lib/request";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { convertToJSON } from "@/lib/convertToJSON";
import Link from "next/link";
import ImportModal from "./ImportModal";
import { useSearchParams } from "next/navigation";
import showToast from "@/lib/toast";
import PreLoader from "@/components/PreLoader";

// Validate and filter the JSON data
const validateAndFilterJsonData = (jsonDetails) => {
  const requiredFields = ["email", "name"];
  const hasValidFields = (obj) =>
    requiredFields.every((field) =>
      Object.keys(obj).some((key) => key.toLowerCase() === field && obj[key]?.trim())
    );
  const validEntries = jsonDetails.filter(hasValidFields);
  if (!validEntries.length) throw new Error("Each entry must have 'email' and 'name'.");
  return validEntries;
};

// Main Page Component
const Page = () => {
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({ name: "", desc: "", details: null });
  const [loading, setLoading] = useState({ fetch: true, form: false });
  const [audiences, setAudiences] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get("session");
    if (userCookie) {
      const sessionData = JSON.parse(userCookie);
      setSession(sessionData);

      const fetchAudiences = async () => {
        setLoading((prev) => ({ ...prev, fetch: true }));
        const res = await request(`/api/audiences?filters[user][$eq]=${sessionData.id}&sort[id]=desc`, {
          headers: { Authorization: `Bearer ${sessionData.jwt}` },
        });
        setAudiences(res.data || []);
        setLoading((prev) => ({ ...prev, fetch: false }));
      };

      fetchAudiences();
    }
  }, []);

  // Close the modal and reset the form data
  const closeModal = () => {
    setOpenModal(false);
    setFormData({ name: "", desc: "", details: null });
    setLoading((prev) => ({ ...prev, form: false }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // Create a new audience with the form data
  const createAudience = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, form: true }));
    try {
      const jsonDetails = formData.details ? await convertToJSON(formData.details) : [{ name: "", email: "" }];
      const validDetails = validateAndFilterJsonData(jsonDetails);
      const res = await request("/api/audiences", {
        method: "POST",
        body: {
          data: { slug: uuidv4(), name: formData.name, user: session.id, desc: formData.desc, details: validDetails },
        },
        headers: { Authorization: `Bearer ${session.jwt}` },
      });
      res.result ? setAudiences((prev) => [res.data, ...prev]) : showToast("error", res.error.message);
      closeModal();
      showToast("success", "Audience created successfully.");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading((prev) => ({ ...prev, form: false }));
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Audiences</h1>
        <Button pill color="blue" onClick={() => setOpenModal(true)}>
          <PlusCircleIcon className="mr-2 h-5 w-5" />
          Create
        </Button>
      </div>

      <Suspense fallback={<PreLoader />}>
        <AudienceContent
          openModal={openModal}
          setOpenModal={setOpenModal}
          formData={formData}
          handleInputChange={handleInputChange}
          createAudience={createAudience}
          loading={loading}
          audiences={audiences}
        />
      </Suspense>
    </div>
  );
};

// Audience Content Component that uses useSearchParams
function AudienceContent({ openModal, setOpenModal, formData, handleInputChange, createAudience, loading, audiences }) {
  const searchParams = useSearchParams();
  const shouldShowModal = searchParams.get("showImportModal") === "true";

  useEffect(() => {
    setOpenModal(shouldShowModal);
  }, [shouldShowModal, setOpenModal]);

  return (
    <>
      <ImportModal
        headerLabel="Create your audience"
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        handleSubmit={createAudience}
        handleInputChange={handleInputChange}
        formData={formData}
        loading={loading}
      />
      {loading.fetch ? (
        <PreLoader />
      ) : audiences.length ? (
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Audience Name</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Participants</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">View</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {audiences.map(({ id, attributes: { name, details, createdAt, slug } }) => (
                <Table.Row key={id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {name}
                  </Table.Cell>
                  <Table.Cell>{new Date(createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{details.length}</Table.Cell>
                  <Table.Cell>
                    <Link
                      href={`/dashboard/audiences/${slug}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      View
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No audiences found.</p>
      )}
    </>
  );
}

export default Page;