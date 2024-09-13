import React, { Component, useEffect } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  Spinner,
  Card,
} from "react-bootstrap";
import { Row, Col, Image, ListGroup } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  emptyDispatch,
  handleLoginInput,
  loginAction,
} from "../../../../store/actions/auth/LoginAction";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FormError from "../../../errors/FormError";
import Cookies from "js-cookie";
import { updateAuthToken } from "helper/api";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const loginInpiut = useSelector((state) => state.authReducer.loginInpiut);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isLogging = useSelector((state) => state.authReducer.isLogging);
  const { formState: { errors } } = useForm();

  const handleLoginInputChange = (name, value) => {
    dispatch(handleLoginInput(name, value));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction(loginInpiut, (response, user) => {
      if (user.email != undefined) {
        updateAuthToken(response);
        router.push("/registration");
      } else {
        toast("Username or password is incorrect")
      }
    }));
  };
  const router = useRouter();
  if (isLogging === true) {
    dispatch(emptyDispatch());
  }
  return <>
    <div className="root">
      <div className="App">
        <div className="wrapper">
          <section className="login-content">
            <Row className="m-0 align-items-center bg-lg-gray vh-100">
              <Col md="6">
                <Row className="justify-content-center">
                  <Col md="10">
                    <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                      <Card.Body>
                        <Link
                          href="/dashboard"
                          className="navbar-brand d-flex align-items-center mb-3"
                          legacyBehavior>
                          <>
                            <img src="/images/MedPro-logo.png" />
                            <h4 className="logo-title ms-3"></h4>
                          </>
                        </Link>

                        <form
                          onSubmit={(e) => handleLogin(e)}
                          method="post"
                          autoComplete="off"
                          encType="multipart/form-data"
                        >
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              autocorrect="off" spellcheck="false" autocomplete="off"
                              name="identifier"
                              value={loginInpiut && loginInpiut.identifier}
                              onChange={(e) =>
                                handleLoginInputChange(
                                  "identifier",
                                  e.target.value
                                )
                              }
                              placeholder="Enter your registered email"
                              {...register('test', {
                                required: true,
                                maxLength: 100,
                              })}
                              // className={`form-control ${errors.email ? "is-invalid" : ""
                              //   }`}
                            />
                            {/* {errors.email &&
                              errors.email.type === "required" && (
                                <FormError error="Email is empty" />
                              )} */}
                          </Form.Group>

                          <Form.Group controlId="formBasicPassword" className="pt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              autocorrect="off"
                              spellcheck="false" 
                              autocomplete="off"
                              type="password"
                              placeholder="Enter Password"
                              name="password"
                              value={loginInpiut && loginInpiut.password}
                              onChange={(e) =>
                                handleLoginInputChange(
                                  "password",
                                  e.target.value
                                )
                              }
                              {...register('test', {
                                required: true,
                              })}
                              // className={`form-control ${errors.password ? "is-invalid" : ""
                              //   }`}
                            />
                            {/* {errors.password &&
                              errors.password.type === "required" && (
                                <FormError error="Password is empty" />
                              )} */}
                          </Form.Group>
                          <div className="d-flex justify-content-center pt-3">
                            {!isLoading && (
                              <a className="col-12 d-block">
                                {" "}
                                <Button variant="primary" className="col-12" type="submit">
                                  Sign In
                                </Button>
                              </a>
                            )}
                            {isLoading && (
                              <a className="col-12 d-block">
                                {" "}
                                <Button
                                  disabled={true}
                                  variant="primary"
                                  type="submit"
                                  className="col-12"
                                >
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>{" "}
                                  Sign In
                                </Button>
                              </a>
                            )}
                          </div>

                          <Col
                            lg="12"
                            className="d-flex justify-content-between pt-3"
                          >
                            <Form.Check className="form-check mb-3">
                              <Form.Check.Input
                                type="checkbox"
                                id="customCheck1"
                              />
                              <Form.Check.Label htmlFor="customCheck1">
                                Remember Me
                              </Form.Check.Label>
                            </Form.Check>
                          </Col>
                          <Col className="login-footer">
                            <Link legacyBehavior href="/forgot-password">
                              Forgot Password?
                            </Link>
                          </Col>

                        </form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col
                md="6"
                className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden"
              >
                <Image
                  src={"/images/med-bg.jpg"}
                  className="Image-fluid h-100 gradient-main"
                  alt="images"
                />
              </Col>
            </Row>
          </section>
        </div>
      </div>
    </div>
  </>;
};

export default Login;
