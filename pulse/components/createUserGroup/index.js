import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../../assets/scss/user/styles.module.scss";

const CreateUserGroup = ({
  onSubmit = () => {},
  onChange = () => {},
  userDetail = {},
  roles = {},
  onClickRole = () => {},
  selectedRole = [],
}) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedSearch, setSelectedSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");

  const getSearchedItem = (selectedSearch = "", data = []) => {
    if (selectedSearch) {
      return data?.filter((item) => item?.role_name.includes(selectedSearch));
    } else {
      return data;
    }
  };

  const onChangSearch = (e, isSelected) => {
    const { value } = e.target;
    if (isSelected) {
      setSelectedSearch(value);
    } else {
      setRoleSearch(value);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">User Group Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userDetail?.name}
              onChange={onChange}
              placeholder="User Group Name"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group"></div>
        </div>

        {/* <div className="col-md-6">
          <div className="form-group">
            <label className="form-label" for="exampleFormControlSelect1">
              Account Type
            </label>

            <Select options={options} />
          </div>
        </div> */}

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              id="w3review"
              // name="w3review"
              rows="4"
              cols="50"
              className="form-control"
              name={"description"}
              value={userDetail?.description}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        {/* <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              className="form-control"
            ></textarea>
          </div>
        </div> */}
        {/* <div className="col-md-6">
          <div className="form-group"></div>
        </div> */}
        <h5 className="form-label mt-4 mb-4">Available Roles</h5>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => onChangSearch(e)}
              value={roleSearch}
              placeholder="search"
              className="form-control"
            />
          </div>
          <div className={styles.search}>
            <ul>
              {getSearchedItem(roleSearch, roles)?.length ? (
                getSearchedItem(roleSearch, roles)?.map((item, index) => (
                  <li onClick={() => onClickRole(item)} key={index}>
                    {item?.role_name || item?.name }
                  </li>
                ))
              ) : (
                <div>No Data found..</div>
              )}
              {/* <li>Abc</li>
              <li>DEf</li>
              <li>Abc</li>
              <li>DEf</li>
              <li>Abc</li>
              <li>DEf</li> */}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => onChangSearch(e, true)}
              value={selectedSearch}
              placeholder="search"
              className="form-control"
            />
          </div>
          <div className={styles.search}>
            <ul>
              {getSearchedItem(selectedSearch, selectedRole)?.length ? (
                getSearchedItem(selectedSearch, selectedRole)?.map(
                  (item, index) => (
                    <li onClick={() => onClickRole(item, true)} key={index}>
                      {item?.role_name || item?.name }
                    </li>
                  )
                )
              ) : (
                <div>No Data found..</div>
              )}
              {/* <li>Abc</li>
              <li>DEf</li>
              <li>Abc</li>
              <li>DEf</li>
              <li>Abc</li>
              <li>DEf</li> */}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <div className=" form-check-inline">
              <Form.Check
                type="checkbox"
                id="isActive"
                name="isActive"
                label="Active"
                checked={userDetail?.isActive}
                onClick={onChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <button type="submit" className="btn btn-danger py-2 px-5">
          Cancal
        </button>
        <button type="submit" className="ms-4 btn btn-primary py-2 px-5">
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateUserGroup;
