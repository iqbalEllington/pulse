import React from "react";
import { Row } from "react-bootstrap";
import BTable from "react-bootstrap/Table";
import Select from "react-select";
import { useTable } from "react-table";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const TermDates = () => {
  const data = React.useMemo(
    () => [
      {
        date: "Hello",
        term: "John",
        reason: "Cena",
        delete: "",
      },
      {
        date: "Hello",
        term: "John",
        reason: "Cena",
        delete: "",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date", // accessor is the "key" in the data
      },
      {
        Header: "Term",
        accessor: "term",
      },

      {
        Header: "Reason",
        accessor: "reason",
      },

      {
        Header: "Delete",
        accessor: "delete", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              <a
                class="btn btn-primary btn-icon btn-sm rounded-pill me-3"
                href="#"
                role="button"
              >
                <svg
                  class="icon-18"
                  width="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className="details mt-5">
      <Row>
        <div className="col-md-12 mt-0">
          <div className="d-flex justify-content-between">
            <h2 className="title">Details</h2>
            <div className="">
              <button className="back btn btn-danger py-2 px-5 ">Back</button>
            </div>
          </div>
        </div>
        <div className="search border pb-5 mt-5 pt-5">
          <div className="d-flex justify-content-between header-title mb-4">
            <h4 class="card-title">Search</h4>

            <button class="p-2 btn btn-primary">Add Term Dates</button>
          </div>
          <div className="forms">
            <form>
              <div className="row">
                <div className="col-md-4">
                  <div class="form-group">
                    <label class="form-label">From Sesion Year</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="User Name"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-group">
                    <label class="form-label">To sesion year</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email/Phone/Mobile"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div class="form-group">
                    <label class="form-label" for="exampleFormControlSelect1">
                      Venues
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
        </div>

        <div className="search border pb-5 mt-5 pt-5">
          <div className="d-flex justify-content-between header-title mb-4">
            <div>
              <button type="submit" class="ms-0 btn btn-primary py-2 px-5">
                Team Seasion (2022 - 2023)
              </button>
              <button className="edit p-2 px-5 btn btn-primary ms-4">
                GEMS Dubai American Academy
              </button>
            </div>
            <div>
              <button class="me-3 p-2 btn btn-danger">Delete</button>
              <button class="p-2 btn btn-primary">Edit</button>
            </div>
          </div>
          <div className="terms-table">
            <div className="term-up">
              <ul className="border-bottom mt-5 pb-3 mb-4">
                <li>TERM</li>
                <li>From Date</li>
                <li>To Date</li>
              </ul>
              <ul>
                <li>
                  <button class="p-2 btn btn-primary">Team 2</button>
                </li>
                <li>
                  <span>Mon, 09/01/2023</span>
                </li>
                <li>
                  <span>Mon, 09/01/2023</span>
                </li>
              </ul>
            </div>
            <div className="closer-day mt-4">
              <button class="p-2 btn btn-primary">Closer Day</button>
              <button class="p-2 btn btn-success">Add Closer Day</button>
            </div>
          </div>

          <div class="card-body mt-5 px-0">
            <BTable striped bordered hover size="sm" {...getTableProps()}>
              <thead>
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column) => (
                          // Apply the header cell props
                          <th {...column.getHeaderProps()}>
                            {
                              // Render the header
                              column.render("Header")
                            }
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {
                  // Loop over the table rows
                  rows.map((row) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()}>
                        {
                          // Loop over the rows cells
                          row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td {...cell.getCellProps()}>
                                {
                                  // Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </BTable>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default TermDates;
