import React, { useEffect, useState } from "react";
import Image from "next/image";
// import handproper from "../../assets/images/handpicked_property1.png";
import Link from "next/link";
// import Select from "react-select";

import { useTable } from "react-table";
import BTable from "react-bootstrap/Table";
// import Switch from "react-switch";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const Menus = () => {
    const [menuData, setmenuData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedCell, setSelectedCell] = useState({});

    const handleClose = () => setShowConfirmModal(false);

    const handleMenuDelete = (cell) => {
        setSelectedCell(cell);
        setShowConfirmModal(true);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Menu Title",
                accessor: "menu_title",

            }, {
                Header: "Parent Id",
                accessor: "parent_id",

            }, {
                Header: "Url",
                accessor: "url",

            }, {
                Header: "Icon",
                accessor: "icon",

            }, {
                Header: "IsActive",
                accessor: "isActive",

                Cell: ({ cell }) => (cell.value === true ? "Yes" : "No"),
            }, {
                Header: "Is Quick Link",
                accessor: "is_quick_link",

                Cell: ({ cell }) => (cell.value === true ? "Yes" : "No"),
            },
            {
                Header: "Operations",
                accessor: "operations",
                Cell: (cell) => {
                    return <>
                        <Link
                            class="btn btn-primary btn-icon btn-sm rounded-pill me-3"
                            href={`edit?menuid=${cell?.row?.original?._id}`}
                            role="button"
                            legacyBehavior>
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
                        </Link>
                        <button
                            class="btn btn-primary btn-icon btn-sm rounded-pill me-3"
                            role="button"
                            onClick={() => handleMenuDelete(cell)}
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
                        </button>
                    </>;
                },
            },
        ],
        []
    );

    const handleConfirmDelete = () => {
        setIsLoading(true);
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}menu/delete/${selectedCell?.row?.original?._id}`
            )
            .then((response) => {
                const currentMenus = [...menuData];
                const newMenus = currentMenus.filter(
                    (menu) => menu._id !== selectedCell?.row?.original?._id
                );
                setmenuData(newMenus);
                toast("Menu deleted successfully.");
                setShowConfirmModal(false);
            })
            .catch((err) => {
                toast(err?.response?.data?.message || "Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
                setSelectedCell({});
            });
    };

    const handleCancelDelete = () => {
        setSelectedCell({});
        handleClose();
    };

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}menu/list`
            );
            setmenuData(data.response);
        };

        getData();
    }, []);

    const tableInstance = useTable({ columns, data: menuData });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <>
            <div className="container-fluid content-inner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header d-flex justify-content-between">
                                <h4 class="card-title">Menu List</h4>
                                <Link legacyBehavior href="/menu/create">
                                    <button class="p-2 btn btn-primary">Add Menu</button>
                                </Link>
                            </div>
                            <div class="card-body table-responsive px-0">
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
                    </div>
                </div>
            </div>
            <Modal show={showConfirmModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this Menu?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>

                    {isLoading ? (
                        <Button disabled variant="primary">
                            {" "}
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>{" "}
                            Delete
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Menus;
