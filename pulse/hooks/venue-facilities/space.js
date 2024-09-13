import { getRequest } from "helper/api";
import { toast } from "react-toastify";

const { useEffect, useState } = require("react");

const useSpaceList = () => {
  const [spaceList, setSpaceList] = useState([]);
  const [venueId, setVenueId] = useState("");

  useEffect(() => {
    const getSpace = async () => {
      let response = await getRequest({ API: `/space/list/${venueId}` });
      if (response?.data?.success) {
        const data = response?.data?.response.map((data) => ({
          ...data,
          label: data.name,
          value: data.layout_id,
        }));
        setSpaceList(data || []);
      } else {
        toast(response?.data?.message ?? "Something went wrong!");
      }
    };
    if (venueId) {
      getSpace();
    }
  }, [venueId]);

  const getSpace = (id) => {
    setVenueId(id);
  };

  return { spaceList, getSpace };
};
export default useSpaceList;
