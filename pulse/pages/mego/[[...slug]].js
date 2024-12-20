import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";

import AddEditView from "components/layouts/page/register/event/addEditView";
import DelegatesView from "components/layouts/page/register/attendance/delegatesView";

const Index = (props) => {
  return (
    <>
      {(props.page[0] != "") &&
        <DelegatesView del={props.page[0]} />
      }
    </>
  );
};
export async function getServerSideProps({ req, params, resolvedUrl }) {
  try {
    console.log(params.slug[1])
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
