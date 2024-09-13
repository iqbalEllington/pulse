import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import List from "components/layouts/page/register/event/registrations"
import Badge from "components/layouts/page/register/event/badge";

const Index = (props) => {
  return (
    // <HorizontalLayout>
    <>
      {(props.page[0]!=undefined) &&
        
        <Badge event={props.page[0]} badges={props.page[1]} id={props.page[2]}/>
      }
      
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
