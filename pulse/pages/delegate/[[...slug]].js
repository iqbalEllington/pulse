import React, { Component } from 'react';

function delegate(props) {
    return (
            <div>redirected</div>
        );
}

export const getServerSideProps = async (context) => {
    const { res } =  context;
    let resolvedUrl = context.resolvedUrl.split("/")
    // res.writeHead(301, { location: "https://medprodocuae.s3.eu-west-1.amazonaws.com/VENEER_COURSE_PROGRAM_ed1bf98dba.pdf" } );
    // res.end();
}
  

export default delegate;