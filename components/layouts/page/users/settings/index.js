import React, { useEffect, useState } from "react";
import { Accordion, Form, FormCheck, Table } from "react-bootstrap";
import { getRequest, postRequest } from "helper/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FormDetails from "components/form/users/formDetails";
import { useRouter } from "next/router";

const getUserAddForms = ({ user }) => {
  const [inputData, setInputData] = useState([]);
  const router = useRouter();

  const [userFormSections, setUserFormSections] = useState([]);
  const [moudelId, setModuleId] = useState("63e3a2894054cd1cfb5ccaf9");
  const getUserForms = async () => {
    let response = await getRequest({
      API: `form/form-detail/63e3a2894054cd1cfb5ccaf9`,
    });
    if (response?.data?.success) {
      setUserFormSections(response?.data?.response[0].sections || []);
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
      router.push("/login");
    } else {
      toast(response?.data?.message ?? "Something went wrong!");
    }
  };

  useEffect(() => {
    getUserForms();
  }, []);
  // useEffect(() => {
  //     console.log(inputData)
  // }, [inputData]);

  // Function will be called from child
  const setInputDatas = (key, value, moudelId, section_id) => {
    var newData={
      module_id: moudelId,
      section_id: section_id,
      fields: value,
    }
    var data=inputData;
    data[key]=newData
    setInputData(data);
    // console.log(data)
  };

  // const { register, handleSubmit, errors, setValue } = useForm();
  const customhandleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      var result = await postRequest({
        API: "user-form/save-user-form-setting/"+moudelId,
        DATA: inputData,
      });
      setIsLoading(false);
      toast("User settings data has been updated");
      // router.push("/user-settings");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      // toast(err?.response?.data?.message || "Something went wrongs.");
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  // const { register, handleSubmit, errors, setValue } = useForm();
  return (
    <div className="container-fluid content-inner">
      <h3>User Settings</h3>
      <form onSubmit={(event) => customhandleSubmit(event)}>
        {userFormSections.map((item, index) => (
          <Accordion defaultActiveKey={index}>
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{item.section_name}</Accordion.Header>
              <Accordion.Body>
                <FormDetails
                  moudelId={moudelId}
                  setInputDatas={setInputDatas}
                  section_id={item._id}
                  form_elements={item.fields}
                  sectionKey={index}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}

        <div>
          <button type="submit" class="mt-2 p-2 btn btn-primary text-center">
            Save User Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default getUserAddForms;
