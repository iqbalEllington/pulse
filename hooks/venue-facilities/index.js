import { getRequest } from "helper/api";
import { toast } from "react-toastify";

const { useEffect, useState } = require("react");

const useVenueList = () => {
  const [venueList, setVenueList] = useState([]);

  useEffect(() => {
    const getVenue = async () => {
      let response = await getRequest({ API: `venue/venue-list` });
      if (response?.data?.success) {
        const data = response?.data?.response.map((data) => ({
          ...data,
          label: data.venue_name,
          value: data._id,
        }));
        setVenueList(data || []);
      } else {
        toast(response?.data?.message ?? "Something went wrong!");
      }
    };
    getVenue();
  }, []);

  return { venueList };
};
export default useVenueList;
