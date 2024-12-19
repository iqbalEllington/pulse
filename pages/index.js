import React, { Component } from 'react';

function Home(props) {
  return (
    <div>redirected</div>
  );
}

export const getServerSideProps = async (context) => {
  const { res } = context;
  let resolvedUrl = context.resolvedUrl.split("/")
  res.writeHead(301, { location: "/dashboard" });
  res.end();
}


export default Home;