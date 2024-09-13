import React from "react";
import { Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Booking = () => {
  return (
    <div className="details mt-5">
      <Row>
        <div className="col-md-12 mt-0">
          <div className="d-flex justify-content-between">
            <h2 className="title">Gems Wellington Academy Al Khail : Events</h2>
            <div className="">
              <button className="back btn btn-danger py-2 px-5 ">Back</button>
            </div>
          </div>
        </div>
        <div className="search border pb-5 mt-5 pt-5">
          <div className="forms">
            <form>
              <div className="row">
                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label">From Date</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="From"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label">To Date</label>
                    <input type="text" class="form-control" placeholder="To" />
                  </div>
                </div>

                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label">From Time</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="From"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label">To Time</label>
                    <input type="text" class="form-control" placeholder="To" />
                  </div>
                </div>

                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label" for="exampleFormControlSelect1">
                      Provider
                    </label>
                    <Select options={options} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label" for="exampleFormControlSelect1">
                      Space:
                    </label>
                    <Select options={options} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label" for="exampleFormControlSelect1">
                      Facility
                    </label>
                    <Select options={options} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label" for="exampleFormControlSelect1">
                      Activity
                    </label>
                    <Select options={options} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label" for="exampleFormControlSelect1">
                      Departments
                    </label>
                    <Select options={options} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="form-group">
                    <label class="form-label" for="exampleFormControlSelect1">
                      Status
                    </label>
                    <Select options={options} />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <button type="submit" class="btn btn-danger py-2 px-5">
                  Rest
                </button>
                <button type="submit" class="ms-4 btn btn-primary py-2 px-5">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="table-responsive mt-5">
            <Table className="table-bordered">
              <thead>
                <tr>
                  <td>Bookee</td>
                  <td>Venue</td>
                  <td>Provider</td>
                  <td>Customer Name</td>
                  <td>Space</td>
                  <td>Facility</td>
                  <td>Activity</td>
                  <td>Hourly Rate</td>
                  <td>Booking Type</td>
                  <td>Date/Time</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Airline</td>
                  <td className="text-capitalize">
                    Gems Wellington Acadmy Al Khali
                  </td>

                  <td>Hamilton</td>
                  <td>-</td>
                  <td>25 swimming</td>

                  <td>. Full</td>
                  <td>swimming</td>
                  <td>0.00 AED</td>
                  <td>Academy</td>
                  <td>
                    <span className="bg-grey">
                      Thu. 10/09/2020 07:00 am - 01:00 pm
                    </span>
                  </td>

                  <td>
                    <button className="me-4 btn btn-primary py-2 px-5">
                      Approved
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Booking;
