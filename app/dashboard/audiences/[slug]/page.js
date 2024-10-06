"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, Dropdown } from "flowbite-react";
import { HiCloudDownload, HiOutlinePencilAlt, HiOutlinePlusCircle } from "react-icons/hi";
import ImportModal from "../ImportModal";
import showToast from "@/lib/toast";
import request from "@/lib/request";
import PreLoader from "@/components/PreLoader";

const Page = ({ params: { slug } }) => {
  const gridRef = useRef(null);
  const router = useRouter();
  const [session, setSession] = useState(Cookies.get("session") && JSON.parse(Cookies.get("session")));
  const [audience, setAudience] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [loading, setLoading] = useState({ remove: false, edit: false });
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) return;
    request(`/api/audiences?filters[slug][$eq]=${slug}&filters[user][$eq]=${session.id}`, { headers: { Authorization: `Bearer ${session.jwt}` } })
      .then(res => {
        if (!res.data?.length) return router.push("/404");
        const { details } = res.data[0].attributes;
        if (details?.length) {
          setColDefs(Object.keys(details[0]).map(key => ({ field: key, filter: true, editable: true })));
          setRowData(details);
        }
        setAudience(res.data[0]);
      });
  }, [session, slug, router]);

  const handleEditAudience = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, edit: true });
    const res = await request(`/api/audiences/${audience.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${session.jwt}` },
      body: { data: audience.attributes },
    });
    !res.error ? setOpenModal(false) : setError(res.error);
    setLoading({ ...loading, edit: false });
  };

  const removeSelectedRows = useCallback(async () => {
    setLoading({ ...loading, remove: true });
    const updatedData = rowData.filter(row => !gridRef.current.api.getSelectedNodes().map(node => node.data).includes(row));
    const res = await request(`/api/audiences/${audience.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${session.jwt}` },
      body: { data: { details: updatedData } },
    });
    if (!res.error) setRowData(updatedData);
    setLoading({ ...loading, remove: false });
  }, [rowData, session, audience]);

  const removeAudience = async () => {
    setLoading({ ...loading, remove: true });
    const res = await request(`/api/audiences/${audience.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${session.jwt}` } });
    if (!res.error) {
      showToast("success", "Audience removed successfully.");
      router.push("/dashboard/audiences");
    }
    setLoading({ ...loading, remove: false });
  };

  const exportData = useCallback(() => gridRef.current.api.exportDataAsCsv(), []);
  const onCellValueChanged = useCallback(async (event) => {
    const newData = [...rowData];
    newData[event.rowIndex] = event.data;
    const res = await request(`/api/audiences/${audience.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${session.jwt}` },
      body: { data: { details: newData } },
    });
    if (!res.error) setRowData(newData);
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
        <p><strong>Description:</strong> {audience?.attributes.desc || "No description available."}</p>
        <p><strong>Participants:</strong> {rowData.length || 0}</p>
        <div className="flex space-x-1">
          <Button size="sm" onClick={() => gridRef.current.api.applyTransaction({ add: [{}] })}>
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
      <div className="ag-theme-quartz-auto-dark *" style={{ height: 800 }}>
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
        ) : <PreLoader />}
      </div>
    </div>
  );
};

export default Page;