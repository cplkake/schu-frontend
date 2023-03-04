import { useEffect } from "react";
import axios from "axios";

export function useFetchCollections({ apiRoute, filtersSelections, setInventory }) {
  useEffect(() => {
    let query = '?';
    let ignore = false;

    // convert filters in filtersSelections into a query string
    for (const [key, value] of Object.entries(filtersSelections)) {
      if (Array.isArray(value)) {
        if (value.length) query = query.concat(value.reduce((string, value) => string.concat(`${key}=${value}&`), ''));
      }
      else query = query.concat(`${key}=${value}&`);
    }
   
    // todo: add error handling
    axios
      .get(`${apiRoute}${query}`)
      .then(res => {
        if (Array.isArray(res.data)) {
          if (!ignore) setInventory(res.data);
        }
        else {
          if (!ignore) setInventory([res.data]); 
        }
      })

    return () => {
      ignore = true;
    };
  }, [filtersSelections])
}