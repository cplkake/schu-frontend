import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = apiRoute => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(apiRoute)
      .then(res => {
        if (Array.isArray(res.data)) setData(res.data);
        else setData([res.data])
        setIsLoading(false);
      })
      .catch(err => {
        setError("Sorry, something went wrong")
        setIsLoading(false)
      });
  }, [apiRoute])

  return { data, isLoading, error }
};

export default useFetch;