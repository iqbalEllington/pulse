import { postRequest_cms } from "helper/api"; // Assuming a helper method for POST
import { API_URLS } from "helper/apiConstant"; // Assuming API constants
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomFileInput from "components/modals/fileUpload";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const ProjectForm = (props) => {
    const [formData, setFormData] = useState({
        name: props.popupValue,
        startDate: null,
        expectedCompletionDate: null,
        area: "",
        plotNum:"",
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
            let formPayload = {
                data:formData
            }
            // if (formData.photos) {
            //     formPayload.append("files.photos", formData.photos); // Strapi expects "files.[fieldname]"
            // }
    
            // Make POST request
            const response = await postRequest_cms({
                API: "/api/projects",
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
    

    return (
        <>
            <div className="formbox">
                <div className="title">
                    <h3>Create Project</h3>
                </div>
                <div className="body">
                <form onSubmit={handleSubmit} action={"projects"}>
                    <table>
                        {/* <thead>
                            <tr>
                                <th>Name</th>
                                <th>Project Start Date</th>
                                <th>Expected Completion Date</th>
                                <th>Area</th>
                                <th>Photo</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Project Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <DatePicker
                                        className="white_input"
                                        showYearDropdown
                                        dateFormat="yyyy-MM-dd"
                                        selected={formData.startDate}
                                        onChange={(date) => handleDateChange("startDate", date)}
                                        placeholderText="Start Date"
                                    />
                                </td>
                                <td>
                                    <DatePicker
                                        className="white_input"
                                        showYearDropdown
                                        dateFormat="yyyy-MM-dd"
                                        selected={formData.expectedCompletionDate}
                                        onChange={(date) => handleDateChange("expectedCompletionDate", date)}
                                        placeholderText="Completion Date"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Area"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Plot Number"
                                        name="plotNum"
                                        value={formData.plotNum}
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

export default ProjectForm;
