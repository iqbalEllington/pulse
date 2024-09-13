import React from "react";
import ProfileLayout from "../components/layouts/ProfileLayout";

export default function Home(props) {
  try{
  return (
    <>
      <ProfileLayout>
        <div>hello</div>
      </ProfileLayout>
    </>
  );
  }catch(exception){
    console.log(exception)
  }
}
