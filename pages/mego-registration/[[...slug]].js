import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import List from "components/layouts/page/register/event/registrations"
import AddEditView from "components/layouts/page/register/event/addEditView";
import Events from "components/layouts/page/register/Events";

const Index = (props) => {
  return (
    // <HorizontalLayout>
    <AddEditView event={12} id={false} action="register"/>
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
