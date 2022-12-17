import { useEffect } from "react";
import axios from "axios";

export function useFetchCollections({ apiRoute, filtersSelections, setInventory }) {
  useEffect(() => {
    let query = '?';
    let ignore = false;

    // convert filters in filtersSelections into a query string
    for (const [key, valueArray] of Object.entries(filtersSelections)) {
      if (valueArray.length) {
        query = query.concat(valueArray.reduce((string, value) => string.concat(`${key}=${value}&`), ''));
      }
    }

    console.log(`apiRoute is: ${apiRoute}`)
   
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