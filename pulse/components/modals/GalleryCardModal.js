import { Button, Modal } from "react-bootstrap";
import style from "./style.module.scss";

const GalleryCardModal = ({
  onCloseModal = () => { },
  show = false,
  data = {},
}) => {
  return (
    <Modal show={show} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{data?.tag || ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={style["modal-cards"]}>
          <img src={data?.file} alt={data?.tag || ""} className={style["img-lg"]} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GalleryCardModal;
