import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import Quicklinks from "components/layouts/menu/Quicklinks";

const Index = (props) => {
  return (
    <HorizontalLayout>
      <Quicklinks/>
    {/* <Events page={props.page[1]==undefined ? "page-1" : props.page[1]}/> */}
    </HorizontalLayout>
  );
};
export async function getServerSideProps({ req, params, resolvedUrl }) {
  console.log(resolvedUrl)
  try {
    return {
      props: {
        status: 200,
        page: (params.slug==undefined? "" :params.slug)
      },
    };
  } catch {
    return {
      props: {
        status: 410,
        page: params.slug,
        reason: "Server Down",
      },
    };
  }
}
export default Index;
