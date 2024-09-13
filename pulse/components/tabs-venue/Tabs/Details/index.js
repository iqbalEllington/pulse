import React from "react";
import { Row, Table } from "react-bootstrap";

const Details = () => {
  return (
    <div className="details mt-5">
      <Row>
        <div className="col-md-12 mt-0">
          <div className="d-flex justify-content-between">
            <h2 className="title">Details</h2>
            <div className="">
              <button className="back btn btn-danger py-2 px-5 ">Back</button>
              <button className="edit p-2 px-5 btn btn-primary ms-4">
                Edit
              </button>
            </div>
          </div>
        </div>
      </Row>
      <Row className="mt-4">
        <div className="col-md-3">
          <div className="side-content">
            <ul>
              <li>- Not Availble -</li>
              <li>- Not Availble -</li>
              <li>- Not Availble -</li>
              <li>- Not Availble -</li>
              <li>- Not Availble -</li>
              <li>- Not Availble -</li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="right-side">
            <ul>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Venue Name</h2>
                  <p>: Gems Dubai American Acadmy</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Venue Code</h2>
                  <p>: DAA</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Adult Fr Name</h2>
                  <p>: Esm Play</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>School Group</h2>
                  <p>: Gems</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Relationship Manager</h2>
                  <p>: Cooper</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Relationship Manager Contact</h2>
                  <p>: 989798898 </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Facilities Supervisor</h2>
                  <p>: Sujana</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Fs Contact No</h2>
                  <p>: 093893834</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Location</h2>
                  <p>
                    :<span>ad Bash</span>
                    <span>ad Bash</span>
                    <span>ad Bash</span>
                    <span>ad Bash</span>
                    <span>ad Bash</span>
                    <span>ad Bash</span>
                    <span>ad Bash</span>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Google Map</h2>
                  <p>
                    <button className="view-maps">View Map</button>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Address</h2>
                  <p>: Corner of Hessa Street Dubai</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Emirate/Area</h2>
                  <p>: Dubai</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Landmark</h2>
                  <p>: ehra Hospital</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Contact Phone</h2>
                  <p>: 3343479832</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Website Access</h2>
                  <p>
                    : <button className="view-maps">FMS Access</button>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Show on Fr Website </h2>
                  <p>
                    : <button className="view-maps">Yes</button>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Show on Holiday Camps </h2>
                  <p>
                    : <button className="view-maps">Yes</button>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Show on Holiday Camps </h2>
                  <p>
                    : <button className="view-maps">Yes</button>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Show on CF Tennies Camps </h2>
                  <p>
                    : <button className="view-maps no">No</button>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Show Events </h2>
                  <p>
                    : <button className="view-maps no">Yes</button>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Map Lattitude</h2>
                  <p>: 25.223.2233</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Map Longtitude</h2>
                  <p>: 25.223.2233</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Afr Descriotion</h2>
                  <p>: get dshgf dd dgf dugvfd bfu fdh d</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Meta Descriotion</h2>
                  <p>: </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Title Tag</h2>
                  <p>: </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="right-side">
            <h4 className="mt-4 mb-3 ps-3">Venue MSO info</h4>
            <ul>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Contact Info</h2>
                  <p>: Jewies Lewies</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Contact Email</h2>
                  <p>: JewiesLewies@gmail.com</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <h2>Contact No.</h2>
                  <p>: </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Details;
