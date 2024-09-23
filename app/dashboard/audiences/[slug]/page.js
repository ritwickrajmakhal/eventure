"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import request from "@/lib/request";
import { Button, Dropdown } from "flowbite-react";
import { HiCloudDownload, HiOutlinePencilAlt, HiOutlinePlusCircle } from "react-icons/hi";
import ImportModal from "../ImportModal";

const Page = ({ params: { slug } }) => {
  const gridRef = useRef(null);
  const [session, setSession] = useState(null);
  const [audience, setAudience] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [loading, setLoading] = useState({ remove: false, edit: false });
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Get user session from cookie
  useEffect(() => {
    const userCookie = Cookies.get("session");
    if (userCookie) setSession(JSON.parse(userCookie));
  }, []);

  // Fetch audience data on page load if user is logged in
  useEffect(() => {
    if (!session) return;

    const fetchAudience = async () => {
      const res = await request(
        `/api/audiences?filters[slug][$eq]=${slug}&filters[user][$eq]=${session.id}`,
        { headers: { Authorization: `Bearer ${session.jwt}` } }
      );
      if (res.data?.length) {
        const { details } = res.data[0].attributes;
        if (details?.length) {
          setColDefs(Object.keys(details[0]).map((key) => ({ field: key, filter: true, editable: true })));
          setRowData(details);
        }
        setAudience(res.data[0]);
      } else router.push("/404");
    };

    fetchAudience();
  }, [session, slug, router]);

  // Handle audience edit form submission
  const handleEditAudience = async (e) => {
    e.preventDefault();
    if (!session) return;
    setLoading((prev) => ({ ...prev, edit: true }));

    const res = await request(`/api/audiences/${audience.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${session.jwt}` },
      body: { data: audience.attributes },
    });

    if (!res.error) setOpenModal(false);
    else setError(res.error);
    setLoading((prev) => ({ ...prev, edit: false }));
  };

  // Remove selected rows from the grid
  const removeSelectedRows = useCallback(async () => {
    setLoading((prev) => ({ ...prev, remove: true }));
    const selectedRows = gridRef.current.api.getSelectedNodes().map((node) => node.data);
    const updatedData = rowData.filter((row) => !selectedRows.includes(row));

    const res = await request(`/api/audiences/${audience.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${session.jwt}` },
      body: { data: { details: updatedData } },
    });

    if (!res.error) setRowData(updatedData);
    setLoading((prev) => ({ ...prev, remove: false }));
  }, [rowData, session, audience]);

  // Remove audience and redirect to audiences page
  const removeAudience = async () => {
    if (!session) return;
    setLoading((prev) => ({ ...prev, remove: true }));
    const res = await request(`/api/audiences/${audience.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.jwt}` },
    });

    if (!res.error) router.push("/dashboard/audiences");
    setLoading((prev) => ({ ...prev, remove: false }));
  };

  // Export grid data as CSV
  const exportData = useCallback(() => gridRef.current.api.exportDataAsCsv(), []);

  // Update row data on cell value change
  const onCellValueChanged = useCallback(async (event) => {
    const updatedRowData = event.data;
    const rowIndex = event.rowIndex;

    const newData = [...rowData];
    newData[rowIndex] = updatedRowData;

    const res = await request(`/api/audiences/${audience.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      body: {data: {details : newData}}
    });

    if (!res.error) {
      setRowData(newData);
    }
  }, [rowData, session, audience]);
  
  return (
    <div>
      <div className="mb-4 dark:bg-gray-800 bg-white rounded-lg lg:p-4 p-2">
          <h2 className="text-2xl font-bold flex items-center justify-between mb-2">
            {audience?.attributes.name || "Unnamed Audience"}
            <HiOutlinePencilAlt onClick={() => setOpenModal(true)} role="button" />
          </h2>
          <ImportModal
            headerLabel={"Edit audience"}
            edit={true}
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            handleSubmit={handleEditAudience}
            handleInputChange={(e) => setAudience((prev) => ({ ...prev, attributes: { ...prev.attributes, [e.target.name]: e.target.value } }))}
            formData={audience?.attributes}
            loading={loading.edit}
            error={error}
          />
        <p className="mb-2"><strong>Description:</strong> {audience?.attributes.desc || "No description available."}</p>
        <p className="mb-2"><strong>Participants:</strong> {rowData.length || 0}</p>
        <div className="flex space-x-1">
          <Button size="sm" onClick={()=>gridRef.current.api.applyTransaction({add: [{}]})}>
            <HiOutlinePlusCircle className="mr-2 h-5 w-5" /> Insert
          </Button>
          <Dropdown size="sm" color="red" label={loading.remove ? "Removing..." : "Remove"}>
            <Dropdown.Item onClick={removeSelectedRows}>Selected rows</Dropdown.Item>
            <Dropdown.Item onClick={removeAudience}>Audience</Dropdown.Item>
          </Dropdown>
          <Button size="sm" color="green" onClick={exportData}>
            <HiCloudDownload className="mr-2 h-5 w-5" /> Export
          </Button>
        </div>
      </div>
      <div className="dark:ag-theme-quartz-dark ag-theme-quartz" style={{ height: 800 }}>
        {audience ? (
          <AgGridReact
            ref={gridRef}
            rowSelection="multiple"
            rowData={rowData}
            columnDefs={colDefs}
            pagination
            paginationPageSize={500}
            paginationPageSizeSelector={[200, 500, 1000]}
            onCellValueChanged={onCellValueChanged}
          />
        ) : "Loading..."}
      </div>
    </div>
  );
};

export default Page;
