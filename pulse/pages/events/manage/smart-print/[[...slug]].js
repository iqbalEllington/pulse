import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import List from "components/layouts/page/event/manage/events"
const Index = (props) => {
  return (
    <HorizontalLayout>
       <List pageSource="samrtPrint" page={props.page[1]==undefined ? "page-1" : props.page[1]}/>
      </HorizontalLayout>
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
