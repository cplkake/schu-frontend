import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = url => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then(res => {
        if (Array.isArray(res.data)) setData(res.data);
        else setData([res.data])
        setIsLoading(false);
      })
      .catch(err => {
        setError("Sorry, something went wrong")
        setIsLoading(false)
      });
  }, [url])

  return { data, isLoading, error }
};

export default useFetch;