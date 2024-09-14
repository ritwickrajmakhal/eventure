"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import request from "@/lib/request";
import { Button, Card, Dropdown, Icon } from "flowbite-react";
import {
  HiCloudDownload,
  HiOutlineTrash,
  HiOutlinePencilAlt,
} from "react-icons/hi";

const Page = ({ params }) => {
  const gridRef = useRef(null);
  const [session, setSession] = useState(null);
  const { slug } = params;
  const [audience, setAudience] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];

  // Load the user session from the cookie
  useEffect(() => {
    const userCookie = Cookies.get("session");
    if (userCookie) {
      setSession(JSON.parse(userCookie));
    }
  }, []);

  // Fetch the audience details from the API when the session is loaded
  useEffect(() => {
    if (session) {
      const fetchAudience = async () => {
        const res = await request(
          `/api/audiences?filters[slug][$eq]=${slug}&filters[user][$eq]=${session.id}`,
          {
            headers: { Authorization: `Bearer ${session.jwt}` },
          }
        );

        if (res.data && res.data.length > 0) {
          const audienceDetails = res.data[0].attributes.details;

          // Extracting column definitions from the first item in the details array
          if (audienceDetails.length > 0) {
            const columns = Object.keys(audienceDetails[0]).map((key) => ({
              field: key,
              filter: true,
              editable: true,
            }));
            setColDefs(columns);

            // Setting the row data from the details array
            setRowData(audienceDetails);
          }
          setAudience(res.data[0]);
        } else {
          router.push("/404"); // Redirect to a 404 page
        }
      };
      fetchAudience();
    }
  }, [slug, session, router]);

  const removeSelected = useCallback(async () => {
    if (session) {
      setLoading(true);
      const selectedRowNodes = gridRef.current.api.getSelectedNodes();
      const selectedRows = selectedRowNodes.map((node) => node.data);
      const updatedData = rowData.filter((row) => !selectedRows.includes(row));
      const updatedAudience = { ...audience };
      updatedAudience.attributes.details = updatedData;
      const res = await request(`/api/audiences/${audience.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
        body: { data: updatedAudience.attributes },
      });
      if (!res.error) {
        setRowData(updatedData);
        setLoading(false);
      }
    }
  }, [gridRef, rowData, session, audience]);

  const removeAudience = async () => {
    if (session) {
      const res = await request(`/api/audiences/${audience.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.jwt}` },
      });
      if (!res.error) {
        router.push("/dashboard/audiences");
      }
    }
  };

  const exportData = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, [gridRef]);

  return (
    <div>
      <Card className="mb-4">
        {/* Audience Information Section */}
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 flex justify-between align-middle">
              {audience?.attributes.name || "Unnamed Audience"}
              <HiOutlinePencilAlt role="button" />
            </h2>
            <p className="mb-1">
              <strong>Description:</strong>{" "}
              {audience?.attributes.desc || "No description available."}
            </p>
            <p>
              <strong>Participants:</strong>{" "}
              {audience?.attributes.details?.length || 0}
            </p>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex space-x-1">
          <Dropdown size={"sm"} label="Add" dismissOnClick={false}>
            <Dropdown.Item>Manual entry</Dropdown.Item>
            <Dropdown.Item>From file</Dropdown.Item>
          </Dropdown>

          <Dropdown
            size={"sm"}
            color={"red"}
            label={loading ? "Removing..." : "Remove"}
            dismissOnClick={false}
          >
            <Dropdown.Item onClick={removeSelected}>
              Remove selected
            </Dropdown.Item>
            <Dropdown.Item onClick={removeAudience}>
              Remove audience
            </Dropdown.Item>
          </Dropdown>

          <Button size={"sm"} color={"green"} onClick={exportData}>
            <HiCloudDownload className="mr-2 h-5 w-5" />
            Export
          </Button>
        </div>
      </Card>
      <div className="ag-theme-quartz-dark" style={{ height: 800 }}>
        {audience ? (
          <AgGridReact
            ref={gridRef}
            rowSelection="multiple"
            rowData={rowData}
            columnDefs={colDefs}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default Page;
