import { useEffect } from "react";
import axios from "axios";

export function useFetchFilters({ filterName, apiRoute, query, setOptions }) {
  useEffect(() => {
    let ignore = false;
    
    axios
    .get(`${apiRoute}${query}`)
    .then(res => {
      if (Array.isArray(res.data)) {
        if (!ignore) {
          return res.data;
        };
      }
      else {
        if (!ignore){
          return [res.data];
        }; 
      }
    })
    .then(invArr => {
      if (filterName === 'brand') setOptions([...new Map(invArr.map(shoe => shoe.brand).map(brand => [brand['_id'], brand])).values()]);
      if (filterName === 'shoe_types') setOptions([...new Map(invArr.reduce((typesArray, shoe) => [...typesArray, ...shoe.shoe_types], []).map(type => [type['_id'], type])).values()]);
    })

  return () => {
    ignore = true;
  };
  }, [query])
}