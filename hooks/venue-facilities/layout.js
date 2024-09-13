import { getRequest } from "helper/api";
import { toast } from "react-toastify";

const { useEffect, useState } = require("react");

const useLayout = () => {
  const [layoutList, setLayoutList] = useState([]);
  const [venueId, setVenueId] = useState("");

  useEffect(() => {
    const getLayoutList = async () => {
      let response = await getRequest({ API: `/layout/view/${venueId}` });
      if (response?.data?.success) {
        const data = response?.data?.response.map((data) => ({
          ...data,
          label: data.name,
          value: data._id,
        }));
        setLayoutList(data[0]);
      } else {
        toast(response?.data?.message ?? "Something went wrong!");
      }
    };
    if (venueId) {
      getLayoutList();
    }
  }, [venueId]);

  const getLayout = (id) => {
    console.log(id, "FFFFFFf");
    setVenueId(id);
  };

  return { layoutList, getLayout };
};
export default useLayout;
