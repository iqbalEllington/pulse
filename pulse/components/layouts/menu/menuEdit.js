import React, { useEffect, useState } from "react";
import Addeditmenu from "components/form/menu/addeditmenu";
import { useRouter } from 'next/router'
import axios from "axios";

const MenuEdit = (props) => {
    var router=useRouter()
    const { query } = router
    const [menuData,setmenuData]=useState([])
    useEffect(() => {   
        const getData = async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}menu/detail/${query.menuid}`
            );
            setmenuData({"menuData": data.response[0], "menuid":query.menuid});
        };
        getData();
    }, []);
    return (
        <div className="container-fluid content-inner">
            <h3 className="mb-3">Edit Menu</h3>
            <div className="venues">
                <div className="card">
                    <div class="card-body">
                        <div className="search">
                            <div className="forms">
                                <Addeditmenu request="update" menuData={menuData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuEdit;
