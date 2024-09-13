import { router } from "next/router";
import React, { useEffect } from "react";

function RedirectToLogin() {
    useEffect(() => {
        router.push("/login")
    }, [])
    return (
        <>
            Loading ...
        </>
    );
};

export default RedirectToLogin;

// export default withRouter(horizontalLayout);
