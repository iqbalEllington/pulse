import { Button, Modal } from "react-bootstrap";

const ConfirmationModal = ({
  onCloseModal = () => {},
  show = false,
  heading = "",
  body = "",
  handelDelete = () => {},
  isLoading = false,
}) => {
  return (
    <Modal show={show} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Close
        </Button>
        <Button variant="primary" disabled={isLoading} onClick={handelDelete}>
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Yes, Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
