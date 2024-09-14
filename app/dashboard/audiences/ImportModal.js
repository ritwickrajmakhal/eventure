import React from "react";
import {
  Modal,
  Label,
  TextInput,
  Textarea,
  FileInput,
  Button,
} from "flowbite-react";

const ImportModal = ({toggleButtonRef, openModal, closeModal, handleSubmit, handleInputChange, formData, loading, error}) => {

  return (
    <Modal
      ref={toggleButtonRef}
      show={openModal}
      size="lg"
      onClose={closeModal}
      popup
    >
      <Modal.Header>Create your audience</Modal.Header>
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
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="desc" value="Description" />
            <Textarea
              rows={2}
              name="desc"
              id="desc"
              value={formData.desc}
              onChange={handleInputChange}
            />
          </div>
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
          <Button
            className="flex m-auto"
            color="blue"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ImportModal;
