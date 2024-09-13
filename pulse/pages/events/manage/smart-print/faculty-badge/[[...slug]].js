import Fucultybadge from "components/layouts/page/event/manage/print/fucultybadge";
import React, { useEffect, useState } from "react";

const Index = (props) => {
  return (
    // <HorizontalLayout>
     <Fucultybadge event={props.page}/>
    // </HorizontalLayout>
  );
};
export async function getServerSideProps({ req, params, resolvedUrl }) {
  try {
    return {
      props: {
        status: 200,
        page: (params.slug==undefined? "" :params.slug[0])
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
