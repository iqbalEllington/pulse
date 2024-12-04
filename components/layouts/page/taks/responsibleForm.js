import { postRequest_cms } from "helper/api"; // Assuming a helper method for POST
import { API_URLS } from "helper/apiConstant"; // Assuming API constants
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomFileInput from "components/modals/fileUpload";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
const ResponsibleForm = (props) => {
    const [formData, setFormData] = useState({
        Name: props.popupValue,
        Whatsapp: null,
        mobile: null,
        email: "",
        mobileCountry:"",
        mobileCountryName:"",
        whatsappCountry: "",
        whatsappCountryName: "",
        whatsapp:"",
        Mobile:"",
        photos: null, // Single file or array depending on the implementation
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (key, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: date,
        }));
    };

    const handleFileChange = (file) => {
        setFormData((prevState) => ({
            ...prevState,
            photos: file, // Assuming file input returns the file object
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create FormData for multipart data
            // const formPayload = new FormData();
            // formPayload.append("name", formData.name);
            // formPayload.append("startDate", formData.startDate); // Ensure date is formatted correctly
            // formPayload.append("expectedCompletionDate", formData.expectedCompletionDate);
            // formPayload.append("area", formData.area);
            let formDataProcess=formData
            formDataProcess["mobile"]=formData.mobileCountry + formData.mobile
            formDataProcess["whatsapp"]=formData.whatsappCountry + formData.whatsapp
            let formPayload = {
                data: formDataProcess
            }
            // if (formData.photos) {
            //     formPayload.append("files.photos", formData.photos); // Strapi expects "files.[fieldname]"
            // }

            // Make POST request
            const response = await postRequest_cms({
                API: "/api/employees",
                DATA: formPayload,
                HEADER: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });

            if (response?.status === 200 || response?.status === 201) {
                toast.success("Project created successfully!");
                props.Closepopup(); // Close form popup
            } else {
                toast.error(`Failed to create project: ${response?.data?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form.");
        }
    };
    const handleMobileNumber = ((key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    })


    return (
        <>
            <div className="formbox">
            <div className="title">
                    <h3>Create Employee</h3>
                </div>
                <div className="body">
                <form onSubmit={handleSubmit} action={"projects"}>
                    <table>
                        {/* <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Whatsapp</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Photo</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Project Name"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                <IntlTelInput
                                        autoHideDialCode="false"
                                        onPhoneNumberChange={(b, n, c, number) => {
                                            handleMobileNumber("whatsappCountry", c.dialCode);
                                            handleMobileNumber("whatsappCountryName", c.iso2);
                                            handleMobileNumber("whatsapp", n);
                                        }}
                                        // value={formData.whatsapp}
                                        onSelectFlag={(number, n) => {
                                            handleMobileNumber("whatsappCountry", n.dialCode);
                                            handleMobileNumber("whatsappCountryName", n.iso2);
                                        }}
                                        preferredCountries={['ae', 'gb', 'us']}
                                        defaultCountry={"ae"}
                                        containerclassName="intl-tel-input"
                                        inputclassName="form-control"
                                    />
                                </td>
                                <td>
                                    <IntlTelInput
                                        autoHideDialCode="false"
                                        onPhoneNumberChange={(b, n, c, number) => {
                                            handleMobileNumber("mobileCountry", c.dialCode);
                                            handleMobileNumber("mobileCountryName", c.iso2);
                                            handleMobileNumber("mobile", n);
                                        }}
                                        // value={formData.mobile}
                                        onSelectFlag={(number, n) => {
                                            handleMobileNumber("mobileCountry", n.dialCode);
                                            handleMobileNumber("mobileCountryName", n.iso2);
                                        }}
                                        preferredCountries={['ae', 'gb', 'us']}
                                        defaultCountry={"ae"}
                                        containerclassName="intl-tel-input"
                                        inputclassName="form-control"
                                    />
                                </td>
                               
                                <td>
                                    <input
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <CustomFileInput onFileChange={handleFileChange} />
                                    {/* Assuming CustomFileInput triggers `onFileChange` with the selected file */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="actionbutton-form">
                        <button className="action-do" type="submit">
                            Create
                        </button>
                        <input
                            className="action-cancel"
                            data-closepop={true}
                            type="button"
                            value="Cancel"
                            onClick={(e) => props.Closepopup(e)}
                        />
                    </div>
                </form>
                </div>
            </div>
        </>
    );
};

export default ResponsibleForm;
