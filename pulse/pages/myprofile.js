import React from "react";
import ProductProfile from "../components/layouts/page/myprofile/ProductProfile";
import ProfileLayout from "../components/layouts/ProfileLayout";

export default function Home(props) {
  try{
  return (
    <>
      <ProfileLayout>
        <ProductProfile />
      </ProfileLayout>
    </>
  );
  }catch(exception){
    console.log(exception)
  }
}
