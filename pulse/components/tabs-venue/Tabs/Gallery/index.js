import ConfirmationModal from "components/modal/ConfirmationModal";
import GalleryCardModal from "components/modals/GalleryCardModal";
import { deleteRequest, getRequest, postRequest } from "helper/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "./style.module.scss";

const Gallery = ({ venueId }) => {
  const [userDetails, setUserDetails] = useState({
    file: {},
    name: "",
    fileLocalLink: "",
  });
  const [loader, setLoader] = useState(false);
  const routes = useRouter();
  const userDetail = Cookies.get("userDetail");
  const { query } = routes;
  const [deleteGallery, setDeleteGallery] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [gallery, setGallery] = useState([]);

  const getData = async () => {
    try {
      const { data } = await getRequest({
        API: `venue/gallery/${venueId}`,
      });

      if (data && data?.response?.length) {
        setGallery(data?.response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleOpen = (data) => {
    setSelectedData(data);
  };
  const handleRemove = (data) => {
    setDeleteGallery(true);
    setSelectedId(data._id);
  };

  const onChangeImage = async (e) => {
    setLoader(true);
    const { files } = e.target;
    let linkLocal = window.URL.createObjectURL(files[0]);
    let updateValue = { ...userDetails };
    updateValue["file"] = files[0];
    updateValue["fileLocalLink"] = linkLocal;
    setUserDetails(updateValue);
    setLoader(false);
  };

  const onChangeInput = (e) => {
    const { value } = e.target;
    let updateValue = { ...userDetails };
    updateValue["name"] = value;
    setUserDetails(updateValue);
  };

  const onClickSave = async () => {
    setLoader(true);
    const body = {};
    let formData = new FormData();
    formData.append("image", userDetails.file);
    let responseFile = await postRequest({
      API: `${process.env.NEXT_PUBLIC_API_SERVER_URL}venue/upload-image`,
      DATA: formData,
    });
    if (responseFile?.data?.success) {
      body["file"] = responseFile?.data?.response?.key;
      body["venue_id"] = query.venueId;
      body["tag"] = userDetails.name;
      body["user_id"] = JSON.parse(userDetail)?._id;
      const response = await postRequest({
        API: `${process.env.NEXT_PUBLIC_API_SERVER_URL}venue/save-image`,
        DATA: body,
      });
      if (response?.data?.success) {
        toast("File uploaded successfully");
        setUserDetails({ file: {}, name: "" });
        getData();
      } else {
        toast(response?.data?.message || "Some thing went wrong");
      }
    } else {
      toast(response?.data?.message || "Some thing went wrong");
    }
    setLoader(false);
  };

  const onDeleteGallery = async () => {
    let response = await deleteRequest({
      API: `${process.env.NEXT_PUBLIC_API_SERVER_URL}venue/gallery/${selectedId}`,
    });
    if (response?.data?.success) {
      toast("Delete successfully");
      setDeleteGallery(false);
      setSelectedId("");
      const currentGallery = [...gallery];
      const newGallery = currentGallery.filter(
        (item) => item?._id !== selectedId
      );
      setGallery(newGallery);
    } else {
      toast(response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className={style.bigbox}>
        <div className={style["card-1"]}>
          <h4>Upload Image</h4>
          <div>
            <label for={"upload-photo"}>
              <img
                src={
                  userDetails?.fileLocalLink
                    ? `${userDetails?.fileLocalLink}`
                    : "/images/add-image.png"
                }
                alt="photo"
                className={style["img"]}
              />
            </label>
            <input
              className={style["type-File"]}
              id="upload-photo"
              disabled={loader}
              onChange={onChangeImage}
              type={"file"}
            />
          </div>
          <div className={style["box-and-input"]}>
            <input
              type="text"
              name="firstname"
              placeholder="Gallery Title"
              value={userDetails?.name}
              className={style["input-box"]}
              onChange={onChangeInput}
            />
            <button
              onClick={onClickSave}
              disable={loader}
              className={style["save"]}
            >
              {loader ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
        {gallery?.map((img) => {
          return (
            <div className={style["cards"]} key={img?._id}>
              <h4>{img?.tag}</h4>
              <img src={img?.file} alt={img?.tag} className={style["img"]} />
              <div className={style["btns"]}>
                <button
                  className={style["remove"]}
                  onClick={() => handleRemove(img)}
                >
                  Remove
                </button>
                <button
                  className={style["open"]}
                  onClick={() => handleOpen(img)}
                >
                  Open
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmationModal
        show={deleteGallery}
        onCloseModal={() => setDeleteGallery(false)}
        handelDelete={() => onDeleteGallery()}
        heading={"Delete"}
        body={"Are you sure to delete this file?"}
      />
      <GalleryCardModal
        show={Object.keys(selectedData)?.length}
        onCloseModal={() => setSelectedData({})}
        data={selectedData}
      />
    </>
  );
};

export default Gallery;
