import Link from "next/link";
import React from "react";
import BTable from "react-bootstrap/Table";
import Select from "react-select";
import { useTable } from "react-table";
import style from "./style.module.scss";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const IncidentReport = () => {
  const data = React.useMemo(
    () => [
      {
        number: "IR-000050",
        type: "Accident",
        venue: "GEMS Dubai American Academy",
        activity: "DAA-School Provier",
        member: "Jemma Lewis",
        datetime: "06-12-2022 09:48am",
        reviewstatus: "Not Reviewed By Health And Safety Executive",
        operations: "",
      },

      {
        number: "IR-000009",
        type: "Accident",
        venue: "GEMS Dubai American Academy",
        activity: "HAMILTON AQUATICS",
        member: "Davor Zigic",
        datetime: "26-10-2020 12:00am",
        reviewstatus: "Not Reviewed By Health And Safety Executive ",
        operations: "",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "NUMBER",
        accessor: "number", // accessor is the "key" in the data
      },
      {
        Header: "TYPE",
        accessor: "type",
      },
      {
        Header: "VENUE",
        accessor: "venue", // accessor is the "key" in the data
      },
      {
        Header: "ACTIVITY",
        accessor: "activity",
      },
      {
        Header: "MEMBER",
        accessor: "member", // accessor is the "key" in the data
      },
      {
        Header: "DATE/TIME",
        accessor: "datetime",
      },
      {
        Header: "REVIEW STATUS",
        accessor: "reviewstatus",
      },
      {
        Header: "OPERATIONS",
        accessor: "operations",
        Cell: (cell) => {
          return (
            <>
              <a
                class="btn btn-primary btn-icon btn-sm rounded-pill me-3"
                href="#"
                role="button"
              >
                <span class="btn-inner">
                  <svg
                    class="icon-32"
                    width="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
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
    <div>
      <div className="d-flex mt-5 mb-3 justify-content-between">
        <h5>
          <strong>GEMS Dubai American Academy : Incident Reports</strong>
        </h5>
        <button class="px-3 btn btn-primary">Back</button>
      </div>
      <div className={style["BOX"]}>
        <div className="d-flex mt-1 justify-content-between">
          <h5>
            <strong>Search:</strong>
          </h5>
          <Link legacyBehavior href="add-venue-incident">
            <button class="px-3 py-2 btn btn-primary">
              Report a New incident
            </button>
          </Link>
        </div>
        <div className="forms mt-3">
          <form>
            <div className="row">
              <div className="col-md-3">
                <div class="form-group">
                  <label class="form-label" for="exampleFormControlSelect1">
                    Type:
                  </label>
                  <Select options={options} />
                </div>
              </div>
              <div className="col-md-3">
                <div class="form-group">
                  <label class="form-label" for="exampleFormControlSelect1">
                    Provider:
                  </label>
                  <Select options={options} />
                </div>
              </div>
              <div className="col-md-3">
                <div class="form-group">
                  <label class="form-label" for="exampleFormControlSelect1">
                    Staff Member:
                  </label>
                  <Select options={options} />
                </div>
              </div>
              <div className="col-md-3">
                <div class="form-group">
                  <label class="form-label" for="exampleFormControlSelect1">
                    Status:
                  </label>
                  <Select options={options} />
                </div>
              </div>
              <div className="col-md-3">
                <div class="form-group">
                  <label class="form-label">From:</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div className="col-md-3">
                <div class="form-group">
                  <label class="form-label">To:</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
            <div className="mt-3 ms-2">
              <button type="submit" class="btn btn-danger py-2 px-5">
                Reset
              </button>
              <button type="submit" class="ms-4 btn btn-primary py-2 px-5">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="card-body table-responsive mt-5 px-0">
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
  );
};

export default IncidentReport;
