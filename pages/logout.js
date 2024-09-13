import React, { useEffect } from "react";
import MainLayout from "../components/layouts/Layout";
import { logoutUserData } from "store/actions/auth/LoginAction";
import Login from "../components/layouts/page/login/Login";
import { useDispatch, useSelector } from "react-redux";

export default function logout(props) {
    const dispatch = useDispatch();

    const logoutUser = async () => {
        dispatch(logoutUserData())
        // router.push("/login")
    }
    useEffect(() => {
        logoutUser()
    })
    return (
        <>
            <MainLayout>
                <Login />
            </MainLayout>
        </>
    );
}
