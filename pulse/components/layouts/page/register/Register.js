import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import Success from "../success";

import FormError from "../../../../errors/FormError";

import {
  ChangeRegisterInputField,
  RegisterFirstStep,
} from "../../../../../store/actions/auth/RegisterAction";

import {
  Button,
  Card,
} from "react-bootstrap";
import { Row, Col, Image, ListGroup } from "react-bootstrap";

import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { updateAuthToken } from "helper/api";
// import Row from "react-bootstrap/Row";
const Register = () => {
  const { register, handleSubmit, errors, setValue, watch } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [stepNo, setStepNo] = useState(1);
  const registerInput = useSelector(
    (state) => state.registerReducer.registerInput
  );
  const isLoading = useSelector((state) => state.registerReducer.isLoading);

  //handle change input
  const handleChangeTextInput = (name, value) => {
    dispatch(ChangeRegisterInputField(name, value));
  };
  const handleRegisterFirstStep = (e) => {
    dispatch(
      RegisterFirstStep(registerInput, (res) => {
        const { token, user } = res.data.response;
        Cookies.set("token", token);
        Cookies.set("userDetail", JSON.stringify(user));
        updateAuthToken(token);
        router.push("/setup");
      })
    );
  };

  return <>
    <div className="root">
      <div className="App">
        <div className="wrapper">
          <section className="login-content">
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
                        <a
                          href="#"
                          className="navbar-brand d-flex align-items-center mb-3"
                        >
                          {/* <!--Logo start--> */}
                          <div className="logo-main">
                            <div className="logo-normal"></div>
                          </div>
                          <h4
                            className="logo-title ms-3"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              style={{ width: "160px" }}
                              src={"/images/MedPro-logo.png"}
                            />
                          </h4>
                        </a>
                        {/* <h2 className="mb-2 text-center">Sign Up</h2> */}

                        <Form
                          onSubmit={handleSubmit(handleRegisterFirstStep)}
                          method="post"
                          autoComplete="off"
                          encType="multipart/form-data"
                          autoSave="off"
                        >
                          {/* {stepNo === 1 && ( */}
                          <>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Email*</Form.Label>
                              <Row>
                                <Col>
                                  <Form.Control
                                    placeholder="Email"
                                    name="email"
                                    value={registerInput.email}
                                    onChange={(e) =>
                                      handleChangeTextInput(
                                        "email",
                                        e.target.value
                                      )
                                    }
                                    {...register('test', {
                                      required: true,
                                      pattern:
                                        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    })}
                                    className={`form-control ${
                                      errors.email ? "is-invalid" : ""
                                    }`}
                                  />

                                  {errors.email && (
                                    <>
                                      {errors.email.type === "required" && (
                                        <FormError error="Email is empty" />
                                      )}
                                      {errors.email?.type === "pattern" && (
                                        <FormError error="Invalid email" />
                                      )}
                                    </>
                                  )}
                                </Col>
                              </Row>
                            </Form.Group>
                            <Row>
                              <Form.Label className="col-12">
                                Your Name
                              </Form.Label>
                              <Form.Group
                                controlId="formBasicDetailes"
                                className="col"
                              >
                                <Row>
                                  <Col>
                                    <Form.Control
                                      placeholder="First name*"
                                      name="first_name"
                                      value={registerInput.first_name}
                                      onChange={(e) =>
                                        handleChangeTextInput(
                                          "first_name",
                                          e.target.value
                                        )
                                      }
                                      {...register('test', {
                                        required: true,
                                        maxLength: 100,
                                      })}
                                      className={`form-control ${
                                        errors.first_name ? "is-invalid" : ""
                                      }`}
                                    />
                                    {errors.first_name &&
                                      errors.first_name.type ===
                                        "required" && (
                                        <FormError error="First Name is empty" />
                                      )}
                                  </Col>
                                </Row>
                              </Form.Group>
                              <Form.Group
                                controlId="formBasicDetailesLname"
                                className="col"
                              >
                                <Row>
                                  <Col>
                                    <Form.Control
                                      placeholder="Last name*"
                                      name="last_name"
                                      value={registerInput.last_name}
                                      onChange={(e) =>
                                        handleChangeTextInput(
                                          "last_name",
                                          e.target.value
                                        )
                                      }
                                      {...register('test', {
                                        required: true,
                                        maxLength: 100,
                                      })}
                                      className={`form-control ${
                                        errors.last_name ? "is-invalid" : ""
                                      }`}
                                    />
                                    {errors.last_name &&
                                      errors.last_name.type ===
                                        "required" && (
                                        <FormError error="Last Name is empty" />
                                      )}
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Row>

                            {/* <Form.Group controlId="formBasicPassword">
                              <Form.Label>Mobile*</Form.Label>
                              <Row>
                                <Col>
                                  <Form.Control
                                    placeholder="Mobile*"
                                    name="mobile"
                                    value={registerInput.mobile}
                                    onChange={(e) =>
                                      handleChangeTextInput(
                                        "mobile",
                                        e.target.value
                                      )
                                    }
                                    {...register('test', {
                                      required: true,
                                      pattern: /^[0-9]{9,12}$/,
                                    })}
                                    className={`form-control ${
                                      errors.mobile ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.mobile && (
                                    <>
                                      {errors.mobile?.type === "required" && (
                                        <FormError error="Mobile is required" />
                                      )}
                                      {errors.mobile?.type === "pattern" && (
                                        <FormError error="Invalid mobile number" />
                                      )}
                                    </>
                                  )}
                                </Col>
                              </Row>
                            </Form.Group> */}

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Password*</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                // value={registerInput.password}
                                onChange={(e) =>
                                  handleChangeTextInput(
                                    "password",
                                    e.target.value
                                  )
                                }
                                {...register('test', {
                                  required: true,
                                  minLength: {
                                    value: 8,
                                    message:
                                      "Password must have at least 8 characters",
                                  },
                                })}
                                className={`form-control ${
                                  errors.password ? "is-invalid" : ""
                                }`}
                              />
                              {errors.password && (
                                <>
                                  {errors.password.type === "required" && (
                                    <FormError error="Password is empty" />
                                  )}
                                  {errors.password.type === "minLength" && (
                                    <FormError error="Passport length must be atleast 8" />
                                  )}
                                </>
                              )}
                            </Form.Group>

                            {/* {isLoading === false && ( */}

                            <div className="d-flex justify-content-center mt-2">
                              {!isLoading && (
                                <a>
                                  {" "}
                                  <Button variant="primary" type="submit">
                                    Sign Up
                                  </Button>
                                </a>
                              )}
                              {isLoading && (
                                <a>
                                  {" "}
                                  <Button
                                    disabled={true}
                                    variant="primary"
                                    type="submit"
                                  >
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>{" "}
                                    Sign Up
                                  </Button>
                                </a>
                              )}
                            </div>
                            {/* )}  */}
                          </>
                          {/* )} */}

                          <p className="mt-3 text-center">
                            Already have an Account?
                            <Link legacyBehavior href="/login" className="text-underline">
                              Sign In
                            </Link>
                          </p>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
              {/* <div className="sign-bg">
                  <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.05">
                      <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                      <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                      <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                      <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                    </g>
                  </svg>
                </div>  */}
            </Row>
          </section>
        </div>
      </div>
    </div>
  </>;
};

export default Register;
