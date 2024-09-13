import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import Quicklinks from "components/layouts/menu/Quicklinks";
import Pipeline from "components/layouts/page/pipeline";

const Index = (props) => {
  return (
    <HorizontalLayout>
      {/* <Quicklinks/> */}
      <Pipeline pipeline={props.page}/>
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
