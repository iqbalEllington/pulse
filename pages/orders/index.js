import React, { useEffect, useState } from "react";
import HorizontalLayout from "components/layouts/horizontalLayout";
import Quicklinks from "components/layouts/menu/Quicklinks"
const Index = (props) => {
  return (
    <HorizontalLayout>
      <Quicklinks/>
    </HorizontalLayout>
  );
};
export default Index;
