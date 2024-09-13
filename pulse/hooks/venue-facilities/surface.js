import { getRequest } from "helper/api";
import { toast } from "react-toastify";

const { useEffect, useState } = require("react");

const useSurfaceList = () => {
  const [surfaceList, setSurfaceList] = useState([]);

  useEffect(() => {
    const getSpace = async () => {
      let response = await getRequest({ API: `/surface/list` });
      if (response?.data?.success) {
        const data = response?.data?.response.map((data) => ({
          ...data,
          label: data.title,
          value: data._id,
        }));
        setSurfaceList(data || []);
      } else {
        toast(response?.data?.message ?? "Something went wrong!");
      }
    };
    getSpace();
  }, []);

  return { surfaceList };
};
export default useSurfaceList;
