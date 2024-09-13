import axios from "axios";
import { showToast } from "components/master/Helper/ToastHelper";
import { useRouter } from "next/router";
import React from "react";
import { Row, Col, Image, Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const ConfirmPassword = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const submit = (values) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      return showToast("error", "Password and Confirm password not matching");
    }

    const dataToSend = {
      token: router.query["code"],
      password,
    };

    const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}user/confirm-password`;
    try {
      axios
        .post(URL, dataToSend)
        .then((res) => {
          showToast("success", res?.data?.message);
          router.push("/login");
        })
        .catch((error) => {
          showToast(
            "error",
            error?.response?.data?.message || "Something went wrong"
          );
        });
    } catch (error) {
      showToast("error", error?.response?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="forgot-pass">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col
            md="6"
            className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden"
          >
            <Image
              src={"/images/artemis.jpg"}
              className="Image-fluid h-100 gradient-main animated-scaleX"
              alt="images"
            />
          </Col>
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <Card.Body>
                    <h2 className="mb-2 text-start">Change Password</h2>

                    <form
                      onSubmit={handleSubmit(submit)}
                      method="post"
                      autoComplete="off"
                      encType="multipart/form-data"
                    >
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="New Password"
                          {...register('test', {
                            required: true,
                          })}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail" className="mt-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          {...register('test', {
                            required: true,
                          })}
                        ></Form.Control>
                      </Form.Group>

                      <div className="d-flex justify-content-start mt-5">
                        <Button variant="primary" type="submit">
                          <span
                            className=""
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          Submit
                        </Button>
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConfirmPassword;
