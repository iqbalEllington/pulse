import React, { useEffect, useState } from "react";
import List from "components/layouts/page/event/manage/events"

import Attendance from "components/layouts/page/register/attendance/attendance";
import HorizontalLayout from "components/layouts/horizontalLayout";

const Index = (props) => {
  return (
    <HorizontalLayout>
      {props.page[0]=="list" && <List pageSource="attendance" page={props.page[1]==undefined ? "page-1" : props.page[1]}/>}

      {(props.page[2] == "check-in" || props.page[2] == "check-out") &&
        <Attendance eventRef={props.page[0]} eventId={props.page[1]} action={props.page[2]} />
      }
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
