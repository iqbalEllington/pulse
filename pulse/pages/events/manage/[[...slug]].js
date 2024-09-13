import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import List from "components/layouts/page/event/manage/events"
import Add from "components/layouts/page/event/manage/add"
const Index = (props) => {
  return (
    <HorizontalLayout>
      {(props.page[0] == "list" || props.page[0] == "" || props.page[0]==undefined) &&
        <List page={props.page[1]==undefined ? "page-1" : props.page[1]}/>
      }
       {props.page[0] == "edit" &&
        <Add action="edit" id={props.page[1]}/>
      }
      {props.page[0] == "view" &&
        <Add action="view" id={props.page[1]}/>
      }
      {props.page[0] == "add" &&
        <Add action="add"/>
      }
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
