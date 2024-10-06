"use client";

import { useEffect, useRef } from "react";
import { Modal, Label, TextInput, Textarea, FileInput, Button } from "flowbite-react";

const ImportModal = ({
  edit = false,
  headerLabel,
  openModal,
  closeModal,
  handleSubmit,
  handleInputChange,
  formData,
  loading,
}) => {
  const toggleButtonRef = useRef(null);

  // Close modal when user clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleButtonRef.current && !toggleButtonRef.current.contains(event.target) && openModal) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openModal, closeModal]);

  return (
    <Modal ref={toggleButtonRef} show={openModal} size="lg" onClose={closeModal} popup>
      <Modal.Header>{headerLabel}</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label htmlFor="name" value="Audience name" />
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Newsletter"
              required
              maxLength={15}
              value={formData?.name}
              onChange={handleInputChange}
              helperText="Max 15 characters"
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="desc" value="Description" />
            <Textarea
              rows={2}
              name="desc"
              id="desc"
              value={formData?.desc}
              onChange={handleInputChange}
              maxLength={50}
            />
          </div>
          {!edit && (
            <div className="mb-3">
              <Label htmlFor="details" value="Upload file" />
              <FileInput
                name="details"
                id="details"
                helperText="Upload a JSON, CSV, YML, YAML, XLS, or XLSX file"
                accept=".json,.yml,.yaml,.xls,.csv,.xlsx"
                onChange={handleInputChange}
              />
            </div>
          )}
          <Button className="flex m-auto" color="blue" type="submit" disabled={loading.form}>
            {loading.form ? "Loading..." : edit ? "Save" : "Import"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ImportModal;
