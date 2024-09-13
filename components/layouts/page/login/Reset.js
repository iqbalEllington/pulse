import React, { Component, useState } from "react";
import { connect } from "react-redux";

import {
  Button
} from "react-bootstrap";
import Link from "next/link";
import {
  emptyDispatch,
  resetAction,
  newPasswordAction,
} from "../../../../store/actions/auth/ResetAction";
import Form from "react-bootstrap/Form";

const Reset = ({
  isMailSend = false,
  newPasswordAction = () => {},
  resetAction = () => {},
}) => {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    code: "",
    passwordConfirmation: "",
  });
  function resetHandleForm(e, data) {
    e.preventDefault();
    resetAction({ email: userDetail.email });
  }
  function resetPasswordHandleForm(e, data) {
    e.preventDefault();
    newPasswordAction(userDetail);
  }

  return (
    <div className="wishbanner pb">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 offset-lg-3">
            <div className="Loginform">
              <div>
                <h1>Reset Password</h1>
                {isMailSend === false && (
                  <>
                    <form
                      onSubmit={(e) => resetHandleForm(e)}
                      method="post"
                      autoComplete="off"
                      encType="multipart/form-data"
                    >
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="identifier"
                          required="true"
                          // value={loginInpiut && loginInpiut.identifier}
                          // onChange={(e) =>
                          //     handleLoginInputChange("identifier", e.target.value)
                          // }
                          placeholder="Enter your registered email"
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              email: e.target.value,
                            })
                          }
                          value={userDetail.email}
                          // {...register('test', {{
                          //     required: true,
                          //     maxLength: 100,
                          // })}
                        />
                        <div className="text-danger m-2">
                          {/* {errors.identifier &&
                                errors.identifier.type === "required" &&
                                "Please enter email !"} */}
                        </div>
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        {" "}
                        Send reset password Link
                      </Button>
                      <Link
                        style={{ background: "#fff", border: "#000" }}
                        href="/login"
                      >

                        <h5>Back to Login</h5>

                      </Link>
                    </form>
                  </>
                )}
                {isMailSend == true && (
                  <>
                    <form
                      onSubmit={(e) => resetPasswordHandleForm(e, userDetail)}
                      method="post"
                      autoComplete="off"
                      encType="multipart/form-data"
                    >
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>RESET PIN</Form.Label>
                        <Form.Control
                          type="text"
                          name="code"
                          required="true"
                          // value={loginInpiut && loginInpiut.identifier}
                          // onChange={(e) =>
                          //     handleLoginInputChange("identifier", e.target.value)
                          // }
                          placeholder="Enter OTP from your email"
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              code: e.target.value,
                            })
                          }
                          value={userDetail.code}
                          // {...register('test', {{
                          //     required: true,
                          //     maxLength: 100,
                          // })}
                        />
                        <div className="text-danger m-2">
                          {/* {errors.identifier &&
                                errors.identifier.type === "required" &&
                                "Please enter email !"} */}
                        </div>
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          required="true"
                          // value={loginInpiut && loginInpiut.identifier}
                          // onChange={(e) =>
                          //     handleLoginInputChange("identifier", e.target.value)
                          // }
                          placeholder="New Password"
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              password: e.target.value,
                            })
                          }
                          value={userDetail.password}
                          // {...register('test', {{
                          //     required: true,
                          //     maxLength: 100,
                          // })}
                        />
                        <div className="text-danger m-2">
                          {/* {errors.identifier &&
                                errors.identifier.type === "required" &&
                                "Please enter email !"} */}
                        </div>
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Confirm your Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="passwordConfirmation"
                          required="true"
                          // value={loginInpiut && loginInpiut.identifier}
                          // onChange={(e) =>
                          //     handleLoginInputChange("identifier", e.target.value)
                          // }
                          placeholder="Confirm your password"
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              passwordConfirmation: e.target.value,
                            })
                          }
                          value={userDetail.passwordConfirmation}
                          // {...register('test', {{
                          //     required: true,
                          //     maxLength: 100,
                          // })}
                        />
                        <div className="text-danger m-2">
                          {userDetail.password == "" ||
                            (userDetail.password !==
                              userDetail.passwordConfirmation &&
                              "Password is not equal !")}
                        </div>
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        {" "}
                        reset password
                      </Button>
                      <Link
                        style={{ background: "#fff", border: "#000" }}
                        href="/login"
                      >

                        <h5>Back to Login</h5>

                      </Link>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isMailSend: state?.ResetReducer?.isMailSend,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    resetAction: (data) => dispatch(resetAction(data)),
    newPasswordAction: (data) => dispatch(newPasswordAction(data)),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Reset);
