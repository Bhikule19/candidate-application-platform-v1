import { useState, useEffect } from "react";
import { getSampleJdJSON } from "../utils/constants";

const useInfiniteScrollAndFetch = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  const fetchApiData = async () => {
    try {
      setLoading(true);
      // fetching data from the provided function
      const response = await getSampleJdJSON();
      const jsonData = response.filter(Boolean); // Filtering out empty objects
      setApiData((prevData) => [...prevData, ...jsonData]);
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
      setOffset((prevOffset) => prevOffset + 10);
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
  }, [offset]);

  return [apiData, loading, error];
};

export default useInfiniteScrollAndFetch;
