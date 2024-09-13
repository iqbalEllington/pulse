import Badge from "components/layouts/page/event/manage/print/badge-dynamic";
import React, { useEffect, useState } from "react";

const Index = (props) => {
  return (
    // <HorizontalLayout>
    <>
     <Badge event={props.page[0]} badges={props.page[1]} />
     </>
    // </HorizontalLayout>
  );
};
export async function getServerSideProps({ req, params, resolvedUrl }) {
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
