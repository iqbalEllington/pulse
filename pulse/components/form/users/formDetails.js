import React, { useEffect, useState } from "react";
import { Form, FormCheck, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormDetails = ({ moudelId, setInputDatas, section_id, form_elements, sectionKey }) => {

    const [inputField, setInputField] = useState({
        module_id: moudelId,
        section_id: section_id,
        fields: form_elements
    })
    const setinput = async (key, name, value) => {
        var fields = inputField.fields;
        fields[key][name] = value.target.checked
        setInputField((prevState) => ({
            ...prevState,
            fields: fields,
        }))
    }

    useEffect(() => {
        setInputDatas(sectionKey, inputField.fields.filter(a => a.is_madatory == true),moudelId,section_id,);
    }, [inputField]);


    return (
        <div className="bd-example table-responsive">

            <Table className="table-bordered">
                <tbody>
                    <tr>
                        <th>Field Name</th>
                        <th>Type</th>
                        <th>Enabled</th>
                        <th>Required</th>
                    </tr>
                    {form_elements.map((field, index) => (
                        <tr>
                            <td>{field.field_name}
                            </td>
                            <td>
                                {field.field_type}
                            </td>
                            <td>
                                <Form.Check className=" form-check-inline">
                                    <FormCheck.Input
                                        defaultChecked={field.is_madatory}
                                        type="checkbox"
                                        data-ids={field._id}
                                        onChange={(value) => setinput(index, 'is_madatory', value)}
                                        className="form-check-input"
                                        name={section_id + '-' + field._id}
                                        id="customCheck6"
                                    />
                                </Form.Check>
                            </td>

                            <td>
                                {/* {JSON.stringify(field)} */}
                                <Form.Check className=" form-check-inline">
                                    <FormCheck.Input
                                        defaultChecked={field.is_madatory}
                                        type="checkbox"
                                        // onChange={(value) => setinput(index, 'is_madatory', value)}
                                        className="form-check-input"
                                        name={section_id + '-' + field._id}
                                        id="customCheck6"
                                    />
                                </Form.Check>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default FormDetails;
