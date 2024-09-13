import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import List from "components/layouts/page/register/event/registrations"
import AddEditView from "components/layouts/page/register/event/addEditView";
import Events from "components/layouts/page/register/Events";

const Index = (props) => {
  return (
    <HorizontalLayout>
      {(props.page[1] == "list") &&
        <List event={props.page[0]} page={props.page[2]==undefined ? "page-1" : props.page[2]}/>
      }
      {(props.page[1] == "" || props.page[1]==undefined) &&
        <Events page={props.page[1]==undefined ? "page-1" : props.page[1]}/>
      }
       {props.page[1] == "edit" &&
        <AddEditView action="edit" event={props.page[0]} id={props.page[2]}/>
      }
      {props.page[1] == "view" &&
        <AddEditView action="view" id={props.page[1]}/>
      }
      {props.page[1] == "register" &&
        <AddEditView event={props.page[0]} id={false} action="register"/>
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
