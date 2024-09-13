import React, { useState } from "react";
import Addeditmenu from "components/form/menu/addeditmenu";

const MenuCreate = () => {
    return (
        <div className="container-fluid content-inner">
            <h3 className="mb-3">Add Menu</h3>
            <div className="venues">
                <div className="card">
                    <div class="card-body">
                        <div className="search">
                            <div className="forms">
                                <Addeditmenu request="add" menuData={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuCreate;
