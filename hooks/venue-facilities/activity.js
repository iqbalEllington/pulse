import { getRequest } from "helper/api";
import { toast } from "react-toastify";

const { useEffect, useState } = require("react");

const useActivityList = () => {
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    const getVenue = async () => {
      let response = await getRequest({ API: `activity/list` });
      if (response?.data?.success) {
        setActivityList(response?.data?.response || []);
      } else {
        toast(response?.data?.message ?? "Something went wrong!");
      }
    };
    getVenue();
  }, []);

  return { activityList };
};
export default useActivityList;
