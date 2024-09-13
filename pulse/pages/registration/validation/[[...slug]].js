import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import List from "components/layouts/page/register/event/validate"
import AddEditView from "components/layouts/page/register/event/addEditView";

const Index = (props) => {
  return (
    <HorizontalLayout>
      {(props.page[0] == "validate" || props.page[1] == "" || props.page[1]==undefined) &&
        <List event={props.page[1]} reference={props.page[2]} />
      }
    </HorizontalLayout>
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
