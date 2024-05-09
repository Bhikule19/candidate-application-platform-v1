import { useState, useEffect } from "react";
import { getSampleJdJSON } from "../utils/constants";

const useInfiniteScrollAndFetch = (itemsPerPage) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  const fetchApiData = async () => {
    try {
      setLoading(true);
      const limit = itemsPerPage; // Calculate the limit based on the itemsPerPage and offset
      // fetching data from the provided function
      const response = await getSampleJdJSON();
      const jsonData = response.filter(Boolean); // Filtering out empty objects
      const newData = jsonData.slice(offset, offset + limit); // Slicing the fetched data =to show only limited number of jobs in UIs
      setApiData((prevData) => [...prevData, ...newData]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      setOffset((prevOffset) => prevOffset + itemsPerPage); //Increase offset by itemsPerPage
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  useEffect(() => {
    fetchApiData();
  }, [offset, itemsPerPage]);

  return [apiData, loading, error];
};

export default useInfiniteScrollAndFetch;
