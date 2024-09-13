import Link from "next/link";
import {
  Accordion,
  Button,
  Form,
  FormCheck,
  Modal,
  Table,
} from "react-bootstrap";

const CreateMultipleForm = ({
  heading = "",
  form = {},
  onFormNameChange = () => {},
  handleAddSectionClick = () => {},
  handleSectionClose = () => {},
  handleSectionNameChange = () => {},
  sectionName = "",
  handleAddField = () => {},
  handleShowFieldModal = () => {},
  handleSubmit = () => {},
  isLoading = false,
  showSectionModal = false,
  handleAddSection = () => {},
  showFieldModal = false,
  handleFieldModalClose = () => {},
  field = {},
  handleFieldNameChange = () => {},
  handleFieldTypeChange = () => {},
  handleFieldRequiredChange = () => {},
  isEdit = false,
  setDeleteField = () => {},
  setDeleteSection = () => {},
  handelSectionUpdate = () => {},
  setIdUpdate = () => {},
  onUpdateFormName = () => {},
  updateField = () => {},
  setFieldSectionId = () => {},
  isFieldEdit = false,
  isSectionEdit = false,
  handleDropDownNameChange = () => {},
}) => {
  return (
    <>
      <div className="container-fluid content-inner">
        <h3 className="mb-3">{heading}</h3>
        <div className="venues">
          <div className="card">
            <div class="card-body">
              <div className="search">
                <div className="forms">
                  {/* <form onSubmit={handleSubmit}> */}
                  <div className="form-group">
                    <label className="form-label">Form Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form?.name}
                      onChange={onFormNameChange}
                    />
                  </div>

                  <div className="d-flex flex-row-reverse mb-4">
                    <button
                      className="btn btn-primary"
                      onClick={handleAddSectionClick}
                    >
                      Add Section
                    </button>
                  </div>
                  <Accordion defaultActiveKey="0">
                    {form?.sections?.map((section, index) => {
                      return (
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>
                            {section?.name || section?.section_name}
                            {isEdit && (
                              <>
                                <button
                                  class="btn btn-primary btn-icon btn-sm rounded-pill me-3"
                                  href="#"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIdUpdate(section?._id);
                                    handleAddSectionClick(
                                      section?.name || section?.section_name,
                                      true
                                    );
                                  }}
                                  role="button"
                                >
                                  <span class="btn-inner">
                                    <svg
                                      class="icon-32"
                                      width="32"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        opacity="0.4"
                                        d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z"
                                        fill="currentColor"
                                      ></path>
                                      <path
                                        d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z"
                                        fill="currentColor"
                                      ></path>
                                      <path
                                        opacity="0.4"
                                        d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </span>
                                </button>
                                <button
                                  class="btn btn-primary btn-icon btn-sm rounded-pill me-3"
                                  role="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteSection(section?._id);
                                  }}
                                >
                                  <svg
                                    class="icon-18"
                                    width="34"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      opacity="0.4"
                                      d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                      fill="currentColor"
                                    ></path>
                                    <path
                                      d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </button>
                              </>
                            )}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="d-flex flex-row-reverse mb-4">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  handleShowFieldModal(index, section);
                                  setFieldSectionId(section?._id);
                                }}
                              >
                                Add Another Field
                              </button>
                            </div>
                            <Table className="table-bordered">
                              <thead>
                                <tr>
                                  <td>Field Name</td>
                                  <td>Field Type</td>
                                  <td>Required</td>
                                  <td>Dropdown value</td>
                                  {isEdit && <td>Action</td>}
                                </tr>
                              </thead>
                              <tbody>
                                {section?.fields?.map((field, idx) => (
                                  <tr key={idx}>
                                    <td>{field.name || field?.field_name}</td>
                                    <td className="text-capitalize">
                                      {field.type || field?.field_type}
                                    </td>
                                    <td>
                                      {field.isRequired || field?.is_madatory
                                        ? "Yes"
                                        : "No"}
                                    </td>
                                    <td>
                                      {field?.type === "dropdown" ||
                                      field?.field_type === "dropdown"
                                        ? field?.dropdown?.toString() ||
                                          field?.options?.toString()
                                        : null}
                                    </td>
                                    {isEdit && (
                                      <td>
                                        <>
                                          <a
                                            class="btn btn-primary btn-icon btn-sm rounded-pill me-3"
                                            href="#"
                                            onClick={() => {
                                              handleShowFieldModal(
                                                index,
                                                field,
                                                true
                                              );
                                              setFieldSectionId(section?._id);
                                            }}
                                            role="button"
                                          >
                                            <span class="btn-inner">
                                              <svg
                                                class="icon-32"
                                                width="32"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  opacity="0.4"
                                                  d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z"
                                                  fill="currentColor"
                                                ></path>
                                                <path
                                                  d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z"
                                                  fill="currentColor"
                                                ></path>
                                                <path
                                                  opacity="0.4"
                                                  d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z"
                                                  fill="currentColor"
                                                ></path>
                                              </svg>
                                            </span>
                                          </a>
                                          <button
                                            class="btn btn-primary btn-icon btn-sm rounded-pill me-3"
                                            role="button"
                                            onClick={() =>
                                              setDeleteField({
                                                field: field,
                                                section: section?._id,
                                              })
                                            }
                                          >
                                            <svg
                                              class="icon-18"
                                              width="34"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                opacity="0.4"
                                                d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                fill="currentColor"
                                              ></path>
                                              <path
                                                d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                fill="currentColor"
                                              ></path>
                                            </svg>
                                          </button>
                                        </>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                  </Accordion>

                  <div className="text-center">
                    {isLoading ? (
                      <button disabled className="btn btn-primary mt-4">
                        {" "}
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Save
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={isEdit ? onUpdateFormName : handleSubmit}
                        className="btn btn-primary mt-4"
                      >
                        {isEdit ? "Update" : "Save"}
                      </button>
                    )}
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showSectionModal}
        onHide={handleSectionClose}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Add New Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Form.Label htmlFor="field">Section Name</Form.Label>
            <Form.Control
              type="text"
              name="field"
              id="field"
              //   className={errors.name ? "is-invalid" : ""}
              value={sectionName}
              onChange={handleSectionNameChange}
            />
            {/* {errors.name ? (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            ) : null} */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSectionClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={isSectionEdit ? handelSectionUpdate : handleAddSection}
          >
            {isSectionEdit ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showFieldModal}
        onHide={handleFieldModalClose}
        centered={true}
      >
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
              //   className={errors.name ? "is-invalid" : ""}
              value={field?.name || field?.field_name}
              onChange={handleFieldNameChange}
            />
            {/* {errors.name ? (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            ) : null} */}
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="field">Field Type</Form.Label>
            <Form.Select
              className={`form-select mb-3`}
              aria-label=".form-select example"
              value={field?.type || field?.field_type}
              onChange={handleFieldTypeChange}
            >
              <option defaultValue="">Selecty the field type</option>
              <option value="text">Text</option>
              <option value="file">File</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
            </Form.Select>

            {/* {errors.type ? (
              <Form.Control.Feedback type="invalid">
                {errors.type}
              </Form.Control.Feedback>
            ) : null} */}
          </div>
          {field?.type === "dropdown" || field?.field_type === "dropdown" ? (
            <div className="mb-3">
              <Form.Label htmlFor="field">Dropdown values</Form.Label>
              <Form.Control
                type="text"
                name="field"
                id="field"
                value={field?.dropdown || field?.options}
                onChange={handleDropDownNameChange}
              />
            </div>
          ) : null}
          <div>
            <Form.Check className=" form-check-inline">
              <FormCheck.Input
                type="checkbox"
                className="form-check-input"
                id="customCheck6"
                checked={field.show || field?.is_madatory}
                onClick={handleFieldRequiredChange}
              />
              Required
            </Form.Check>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFieldModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) =>
              isFieldEdit ? updateField(e, field) : handleAddField(e)
            }
          >
            {isFieldEdit ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateMultipleForm;
