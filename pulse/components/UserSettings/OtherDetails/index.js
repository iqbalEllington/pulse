import React, { useState } from "react";
import { Button, Form, FormCheck, Modal, Table } from "react-bootstrap";

const OtherDetails = () => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({
    type: "",
    name: "",
  });

  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");

  const [fields, setFields] = useState([
    {
      name: "Passport Image",
      type: "file",
      show: false,
    },
    {
      name: "Driving License",
      type: "file",
      show: true,
    },
  ]);

  const handleClose = () => setShow(false);
  const showModal = () => setShow(true);

  const handleAdd = () => {
    setFields([...fields, { name: fieldName, type: fieldType, show: false }]);
    setFieldName("");
    setFieldType("");
    setShow(false);
  };

  const handleFieldNameChange = (e) => setFieldName(e.target.value);

  const handleTypeChange = (e) => setFieldType(e.target.value);

  return (
    <div>
      <div className="d-flex flex-row-reverse mb-4">
        <button className="btn btn-primary" type="submit" onClick={showModal}>
          Add Another Field
        </button>
      </div>
      <Table className="table-bordered">
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td>{field.name}</td>
              <td className="text-capitalize">{field.type}</td>
              <td>
                <Form.Check className=" form-check-inline">
                  <FormCheck.Input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheck6"
                    checked={field.show}
                  />
                </Form.Check>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">Add New Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Form.Label htmlFor="field">Field Name</Form.Label>
            <Form.Control
              type="text"
              name="field"
              id="field"
              className={errors.name ? "is-invalid" : ""}
              value={fieldName}
              onChange={handleFieldNameChange}
            />
            {errors.name ? (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            ) : null}
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="field">Field Type</Form.Label>
            <Form.Select
              className={`form-select mb-3 ${errors.type ? "is-invalid" : ""}`}
              aria-label=".form-select example"
              value={fieldType}
              onChange={handleTypeChange}
            >
              <option defaultValue="">Selecty the field type</option>
              <option defaultValue="text">Text</option>
              <option defaultValue="dropdown">Dropdown</option>
            </Form.Select>

            {errors.type ? (
              <Form.Control.Feedback type="invalid">
                {errors.type}
              </Form.Control.Feedback>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OtherDetails;
