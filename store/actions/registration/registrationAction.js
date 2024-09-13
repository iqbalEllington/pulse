// import { getURL } from "next/dist/next-server/lib/utils";

export const validateRegistrationItems =async (registrationItem) => {
  var registrationItemError=registrationItem
  if(registrationItem.RegisteredFeeOption==""){
    registrationItemError.RegisteredFeeOption=false
  }
  console.log(registrationItem, "lets check from here")
  
};
