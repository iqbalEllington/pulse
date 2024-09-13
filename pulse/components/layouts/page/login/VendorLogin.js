import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginInput } from "../../../../store/actions/auth/LoginAction";
const VendorLogin = ({ router }, props) => {
  const dispatch = useDispatch();
  const loginInpiut = useSelector((state) => state.authReducer.loginInpiut);
  const handleLoginInputChange = (name, value) => {
    dispatch(handleLoginInput(name, value))
  }
  const handleLogin = (e) => {
    
  }
  return (
    <>
      <div className="wishbanner pb">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 offset-lg-3">
              <div className="Loginform">
                <h1>Vendor Login</h1>
                <Form autoComplete="off">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email or phone number</Form.Label>
                    <Form.Control
                      type="email"
                      name="identifier"
                      value={loginInpiut.identifier}
                      onChange={(e) => handleLoginInputChange('identifier', e.target.value)}
                      placeholder="Enter your register email or phone number"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={loginInpiut.password}
                      onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    />
                  </Form.Group>
                  <Link legacyBehavior href="/">
                    <a>
                      {" "}
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </a>
                  </Link>
                  <Link legacyBehavior href="/">
                    <a>
                      <h5>Forget Password?</h5>
                    </a>
                  </Link>
                  <h6>New to Maccaf</h6>

                  <Link legacyBehavior href="/vendorRegister">
                    <a>
                      {" "}
                      <button className="createbtn" type="submit">
                        Create an account
                      </button>
                    </a>
                  </Link>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorLogin;
