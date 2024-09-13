import { postRequest } from "helper/api";
import React, { useState } from "react";
import { Form, FormCheck, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormDetails = ({ form_elements, section_id, register, setValue }) => {

  return (
    <div className="bd-example table-responsive">

      <Table className="table-bordered">
        <tbody>
          <input type="hidden" value={section_id} name="section_id" {...register('test', {{})} />

          {form_elements.map((field, index) => (
            <tr>
              <td>{field.field_name}
                <input type="hidden" value={field._id}
                  {...register('test', {

                  })}
                  name="form_fields[]" />
                
              </td>
              <td>
                {JSON.stringify(field)}
                <Form.Check className=" form-check-inline">
                  <FormCheck.Input
                    defaultChecked={field.is_madatory}
                    type="checkbox"
                    className="form-check-input"
                    name={section_id + '-' + field._id}
                    id="customCheck6"
                  />
                </Form.Check>
              </td>
              <td>
                {/* {JSON.stringify(field)} */}
                {field.field_type}
              </td>
              <td>
                {/* {JSON.stringify(field)} */}
                <Form.Check className=" form-check-inline">
                  <FormCheck.Input
                    defaultChecked={field.is_madatory}
                    type="checkbox"
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
