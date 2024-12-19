import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
} from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { showToast } from "/components/master/Helper/ToastHelper";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyDispatch,
  handleLoginInput,
  loginAction,
} from "../../../../store/actions/auth/LoginAction";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FormError from "../../../errors/FormError";
import Cookies from "js-cookie";
import { updateAuthToken, updateAuthToken2 } from "helper/api";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const loginInpiut = useSelector((state) => state.authReducer.loginInpiut);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isLogging = useSelector((state) => state.authReducer.isLogging);
  const userData = useSelector((state) => state.authReducer.userData);
  const [error, setError] = useState(false)
  const [isOtp, SetIsOtp] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  // const { formState: { errors } } = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useEffect(() => {
    if (userData?.role?.name === "Task Managers") {
      window.location.href = "/tasks";
    } else if (userData?.id) {
      window.location.href = "/dashboard";
    } else {
      // Optional: Do nothing or handle the default case
    }
  }, [userData]);
  // const { register, handleSubmit, errors, setValue } = useForm();

  const handleLoginInputChange = (name, value) => {
    dispatch(handleLoginInput(name, value));
  };

  const handleLogin = (e) => {
    if (isOtp == true) {
      dispatch(loginAction(e, async (response, user) => {
        setErrorMessage(response)
        await response
        if (user.email != undefined) {
          updateAuthToken(response);
          updateAuthToken2(response)
          setError(false)
        } else {
          if (user == false) {
            setError("Username or password is incorrect")
          }
          toast("Username or password is incorrect")
        }
      }));
    } else {
      Login2factor(e)
    }
  };

  const Login2factor = (loginData) => {
    const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}api/auth/login`;
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      };
      fetch(URL, options)
        .then(response => {
          if (!response.ok) {  // Check if the response status is not 200-299
            setErrorMessage("Email or Password is not matching")
          } else {
            setErrorMessage(false)
            SetIsOtp(true)
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error:', error); // Log the error for debugging
          if (error.message.includes('Status: 400')) {
            setErrorMessage("Bad Request - Please check your input.")
            showToast("Bad Request - Please check your input.");
          } else {
            setErrorMessage("Network Error, Please Try Again Later")
            showToast("Network Error, Please Fix this!");
          }
        });
    } catch (error) {
      setErrorMessage("Network Error, Please Try Again Later")
      showToast("error", "Network Error, Please Fix this!");
      dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: false });
      callback(false, false);
      return;
    }
    return
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
            <Row className="d-flex bg-lg-black vh-100 min-h-500">
              <Col className="p-relative bg-login" style={{ "background": "url(/images/ellingtonlogo.svg)", "position": "relative", "backgroundRepeat": "repeat" }}>
                {/* <div className="bottom-banner">
                  <div className="p-5">
                    <h1 className="pt-5">
                      Crafting Unforgettable Event Experiences
                    </h1>
                    <p>
                      Elevate Your Events to New Heights
                    </p>
                  </div>
                </div> */}
                {/* <Image
                  src={"/images/vr-bg.jpg"}
                  className="Image-fluid h-100 gradient-main"
                  alt="images"
                /> */}
              </Col>
              <Col className="h-100 login-form p-5">
                <Row className="justify-content-center p-5">
                  <Col md="10">
                    <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                      <Card.Body>
                        <Link
                          href="/login"
                          className="navbar-brand d-flex align-items-center mb-3"
                          legacyBehavior>
                          <>
                            <img src="/images/ellington-logo-white.svg" />
                            <h4 className="logo-title ms-3"></h4>
                          </>
                        </Link>
                        <div className="text-left mt-5 pt-5">
                          <h3>Sign in to Pulse</h3>
                          <p>Your Centralized Reporting for Sales, Updates, and Inventory</p>
                        </div>
                        {errorMessage &&
                          <div className="errorBox-login"> {errorMessage}</div>
                        }
                        <form
                          onSubmit={handleSubmit(handleLogin)}
                          method="post"
                          autoComplete="off"
                          className="mt-5"
                          encType="multipart/form-data"
                        >
                          <Form.Group controlId="formBasicEmail" className={isOtp ? "hidden hidden-form" : ""}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              autocorrect="off" spellcheck="false" autocomplete="off"
                              name="identifier"
                              // value={loginInpiut && loginInpiut.identifier}
                              // onChange={(e) =>
                              //   handleLoginInputChange(
                              //     "identifier",
                              //     e.target.value
                              //   )
                              // }
                              placeholder="Enter your registered email"
                              {...register('identifier', {
                                required: true,
                              })}
                              className={`form-control ${errors.email ? "is-invalid" : ""
                                }`}
                            />
                            {errors.email &&
                              errors.email.type === "required" && (
                                <FormError error="Email is empty" />
                              )}
                          </Form.Group>


                          <Form.Group controlId="formBasicPassword" className={isOtp ? "hidden hidden-form" : "pt-4"}>
                            <Form.Label>Password</Form.Label>
                            <div className="formgroup">
                              <Form.Control
                                autocorrect="off"
                                spellcheck="false"
                                autocomplete="off"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter Password"
                                name="password"
                                // value={loginInpiut && loginInpiut.password}
                                // onChange={(e) =>
                                //   handleLoginInputChange(
                                //     "password",
                                //     e.target.value
                                //   )
                                // }
                                {...register('password', {
                                  required: true,
                                })}
                                className={`form-control ${errors.password ? "is-invalid" : ""
                                  }`}
                              />
                              <span onClick={(e) => { togglePasswordVisibility(), e.preventDefault() }} className="eye-icon">  {showPassword ? <FaEye /> : <FaEyeSlash />}
                              </span>
                            </div>
                            {errors.password &&
                              errors.password.type === "required" && (
                                <FormError error="Password is empty" />
                              )}
                          </Form.Group>

                          <Form.Group controlId="formBasicEmail" className={!isOtp ? "hidden hidden-form" : "pt-4"}>
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                              type="text"
                              autocorrect="off" spellcheck="false" autocomplete="off"
                              name="otp"
                              placeholder="Please Enter OTP send to WhatsApp / Email"
                              className={`form-control ${errors.email ? "is-invalid" : ""
                                }`}
                              {...register('otp', {
                                required: false,
                              })}
                            />
                            {errors.otp &&
                              errors.email.type === "required" && (
                                <FormError error="Email is empty" />
                              )}
                          </Form.Group>
                          {error != false &&
                            <FormError error={error} />
                          }
                          <div className="d-flex justify-content-left mt-5">
                            {!isLoading && (
                              <a className="col-12 d-block">
                                {" "}
                                <Button variant="success" className="col-12 bg-white el-login" type="submit">
                                  Sign in to Pulse
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
                                  Loading...
                                </Button>
                              </a>
                            )}
                          </div>

                          <Col
                            className="d-flex justify-content-between pt-4 row"
                          >
                            {/* <Col className="col-6">
                              <Form.Check className="form-check mb-3">
                                <Form.Check.Input
                                  type="checkbox"
                                  id="customCheck1"
                                />
                                <Form.Check.Label htmlFor="customCheck1">
                                  Remember Me
                                </Form.Check.Label>
                              </Form.Check>
                            </Col> */}
                            {/* <Col className="col-6 ">
                              <Link legacyBehavior href="/forgot-password">
                                Forgot Password?
                              </Link>
                            </Col> */}
                          </Col>


                        </form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>

            </Row>
          </section>
        </div>
      </div>
    </div>
  </>;
};

export default Login;
