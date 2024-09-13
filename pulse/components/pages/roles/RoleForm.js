import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import FormError from "components/errors/FormError";

const RoleForm = ({
  handleSubmission,
  isLoading,
  role = {},
  selectedPermissions,
  setSelectedPermissions,
  permissions,
}) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const [allSelected, setAllSelected] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [selectedColumns, setSelectedColumns] = useState({});

  useEffect(() => {
    if (Object.keys(role).length > 0) {
      reset({
        title: role.title,
      });
    }
  }, [role]);

  const handleAllSelection = (e) => {
    const allPermissions = { ...permissions };
    const newSelectedPermissions = { ...selectedPermissions };
    if (e.target.checked) {
      Object.keys(allPermissions).map((permission) => {
        ["get", "put", "post", "delete"].map((method) => {
          if (
            allPermissions[permission][method] &&
            !newSelectedPermissions[allPermissions[permission][method]?._id]
          ) {
            newSelectedPermissions[allPermissions[permission][method]?._id] =
              allPermissions[permission][method];
          }
        });
      });

      const newSelectedRows = {};
      Object.keys(permissions).map(
        (permission) => (newSelectedRows[permission] = true)
      );
      setSelectedRows(newSelectedRows);
      setSelectedColumns({
        ...selectedColumns,
        get: true,
        put: true,
        post: true,
        delete: true,
      });
      setAllSelected(true);
    } else {
      Object.keys(allPermissions).map((permission) => {
        ["get", "put", "post", "delete"].map((method) => {
          if (newSelectedPermissions[allPermissions[permission][method]?._id]) {
            newSelectedPermissions[
              allPermissions[permission][method]?._id
            ] = false;
          }
        });
      });
      const newSelectedRows = {};
      Object.keys(permissions).map(
        (permission) => (newSelectedRows[permission] = false)
      );
      setSelectedRows(newSelectedRows);
      setSelectedColumns({
        ...selectedColumns,
        get: false,
        put: false,
        post: false,
        delete: false,
      });
      setAllSelected(false);
    }
    setSelectedPermissions(newSelectedPermissions);
  };

  const handleRowSelection = (e, item) => {
    const permission = permissions[item];
    const newSelectedPermissions = { ...selectedPermissions };
    if (e.target.checked) {
      Object.keys(permission).map((key) => {
        if (!newSelectedPermissions[permission[key]._id]) {
          newSelectedPermissions[permission[key]._id] = permission[key];
        }
      });
      setSelectedRows({
        ...selectedRows,
        [item]: true,
      });
    } else {
      Object.keys(permission).map((key) => {
        if (newSelectedPermissions[permission[key]._id]) {
          newSelectedPermissions[permission[key]._id] = false;
        }
      });
      setSelectedRows({
        ...selectedRows,
        [item]: false,
      });
    }
    setSelectedPermissions(newSelectedPermissions);
  };

  const handleChecked = (e, item) => {
    if (e.target.checked) {
      setSelectedPermissions({
        ...selectedPermissions,
        [item._id]: item,
      });
    } else {
      setSelectedPermissions({
        ...selectedPermissions,
        [item._id]: false,
      });
      setSelectedColumns({
        ...selectedColumns,
        [item.method]: false,
      });
    }
  };

  const handleColumnSelect = (e, method) => {
    const allPermissions = { ...permissions };
    const newSelectedPermissions = { ...selectedPermissions };
    if (e.target.checked) {
      Object.keys(allPermissions).map((permission) => {
        if (!newSelectedPermissions[allPermissions[permission][method]?._id]) {
          newSelectedPermissions[allPermissions[permission][method]?._id] =
            allPermissions[permission][method];
        }
      });
      setSelectedColumns({
        ...selectedColumns,
        [method]: true,
      });
    } else {
      Object.keys(allPermissions).map((permission) => {
        if (newSelectedPermissions[allPermissions[permission][method]?._id]) {
          newSelectedPermissions[
            allPermissions[permission][method]?._id
          ] = false;
        }
      });
      setSelectedColumns({
        ...selectedColumns,
        [method]: false,
      });
    }
    setSelectedPermissions(newSelectedPermissions);
  };

  return (
    <div className="card-body">
      <div className="forms">
        <form onSubmit={handleSubmit(handleSubmission)}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div class="form-group">
                <label class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  {...register('test', {
                    required: true,
                  })}
                />
                {errors.title && errors.title.type === "required" ? (
                  <FormError error="Title is required" />
                ): null}
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>
                    <Form.Check
                      type={"checkbox"}
                      id={`permissions`}
                      label={`PERMISIONS`}
                      checked={allSelected}
                      onClick={handleAllSelection}
                    />
                  </th>
                  <th className="">
                    {" "}
                    <Form.Check
                      type={"checkbox"}
                      id={`view`}
                      label={`VIEW`}
                      checked={selectedColumns["get"]}
                      onClick={(e) => handleColumnSelect(e, "get")}
                    />
                  </th>
                  <th className="">
                    {" "}
                    <Form.Check
                      type={"checkbox"}
                      id={`edit`}
                      label={`EDIT`}
                      checked={selectedColumns["put"]}
                      onClick={(e) => handleColumnSelect(e, "put")}
                    />
                  </th>
                  <th className="">
                    <Form.Check
                      type={"checkbox"}
                      id={`create`}
                      label={`CREATE`}
                      checked={selectedColumns["post"]}
                      onClick={(e) => handleColumnSelect(e, "post")}
                    />
                  </th>
                  <th className="">
                    <Form.Check
                      type={"checkbox"}
                      id={`delete`}
                      label={`DELETE`}
                      checked={selectedColumns["delete"]}
                      onClick={(e) => handleColumnSelect(e, "delete")}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(permissions).length > 0 ? (
                  Object.keys(permissions).map((permission, index) => (
                    <tr>
                      <td className="">
                        <Form.Check
                          type={"checkbox"}
                          id={permission}
                          label={permission}
                          checked={selectedRows[permission]}
                          onClick={(e) => handleRowSelection(e, permission)}
                        />
                      </td>
                      <td className="">
                        {permissions[permission]["get"] ? (
                          <Form.Check
                            type={"checkbox"}
                            id={`index-${index}`}
                            label={`Index`}
                            checked={
                              selectedPermissions[
                                permissions[permission]["get"]._id
                              ]
                            }
                            onClick={(e) =>
                              handleChecked(e, permissions[permission]["get"])
                            }
                          />
                        ) : null}
                      </td>
                      <td className="">
                        {permissions[permission]["put"] ? (
                          <Form.Check
                            type={"checkbox"}
                            id={`edit-${index}`}
                            label={`edit`}
                            checked={
                              selectedPermissions[
                                permissions[permission]["put"]._id
                              ]
                            }
                            onClick={(e) =>
                              handleChecked(e, permissions[permission]["put"])
                            }
                          />
                        ) : null}
                      </td>
                      <td className="">
                        {" "}
                        {permissions[permission]["post"] ? (
                          <Form.Check
                            type={"checkbox"}
                            id={`create-${index}`}
                            label={`create`}
                            checked={
                              selectedPermissions[
                                permissions[permission]["post"]?._id
                              ]
                            }
                            onClick={(e) =>
                              handleChecked(e, permissions[permission]["post"])
                            }
                          />
                        ) : null}
                      </td>
                      <td>
                        {permissions[permission]["delete"] ? (
                          <Form.Check
                            type={"checkbox"}
                            id={`delete-${index}`}
                            label={`delete`}
                            checked={
                              selectedPermissions[
                                permissions[permission]["delete"]._id
                              ]
                            }
                            onClick={(e) =>
                              handleChecked(
                                e,
                                permissions[permission]["delete"]
                              )
                            }
                          />
                        ) : null}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
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
                  className="btn btn-primary mt-4"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;
