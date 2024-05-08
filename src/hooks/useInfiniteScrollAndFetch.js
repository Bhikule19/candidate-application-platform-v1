import { useState, useEffect } from "react";
import { API_REQUESTOPTIONS } from "../utils/constants";

const useInfiniteScrollAndFetch = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  const fetchApiData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          ...API_REQUESTOPTIONS,
          body: JSON.stringify({ ...API_REQUESTOPTIONS.body, offset }),
        }
      );
      const json = await response.json();
      setApiData((prevData) => [...prevData, ...json.jdList]);
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
