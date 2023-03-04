import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductCard, FilterCheckOptionBlock } from '../components/index';
import { useFetchCollections } from "../hooks/useFetchCollections";
import useWindowDimensions from '../hooks/useWindowDimensions';
import '../index.css';

export default function Collections() {
  const { width } = useWindowDimensions();
  const isFiltersContainerHidden = width < 768 ? true : false;
  const currentPath = useLocation().pathname;
  let apiRoute = '/api/collections';
  
  const [filtersSelections, setFiltersSelections] = useState(createDefaultFilters());
  const [inventory, setInventory] = useState([]);
  const [hideFiltersContainerDisplay, setHideFiltersContainerDisplay] = useState(isFiltersContainerHidden);
  
  
  function createDefaultFilters() {
    if (currentPath === '/collections') return { brand: [], shoe_types: [],};
    else if (currentPath === '/collections/new-arrivals') return { brand: [], shoe_types: [], new_arrivals: true, };
    else if (currentPath.match(/[0-9a-fA-F]{24}$/)) return { brand: [currentPath.match(/[0-9a-fA-F]{24}$/)], shoe_types: [], };
  }

  function createBrandFilterQuery() {
    // if currentPath a collections page of a specific brand as specified by a matching ObjectId string
    if (currentPath.match(/[0-9a-fA-F]{24}$/)) {
      // return a query string for just that brand
      const brandId = currentPath.match(/[0-9a-fA-F]{24}$/)[0];
      return `?brand=${brandId}&`
    }
    else return retrieveFilterQuery('brand');
  }
  
  function retrieveFilterQuery(filter) {
    let query = '?'
    for (const [key, value] of Object.entries(filtersSelections)) {
      if (key !== filter) {
        // only case not to add a currently-existing variable in filtersSelection is if it is an empty variable, otherwise add it to query
        if (Array.isArray(value)) {
          if (value.length) query = query.concat(value.reduce((string, value) => string.concat(`${key}=${value}&`), ''));
        }
        else query = query.concat(`${key}=${value}&`);
      }
    }
    return query;
  }

  const handleBrandFilterSelection = (brandId) => {
    const index = filtersSelections.brand.findIndex(selectedBrand => selectedBrand === brandId);
    if (index === -1) setFiltersSelections({ ...filtersSelections, brand: [...filtersSelections.brand, brandId]});
    else setFiltersSelections({ ...filtersSelections, brand: [...filtersSelections.brand.slice(0, index), ...filtersSelections.brand.slice(index + 1)]});
  }

  const handleFootwearTypeFilterSelection = (typeId) => {
    const index = filtersSelections.shoe_types.findIndex(selectedType => selectedType === typeId);
    if (index === -1) setFiltersSelections({ ...filtersSelections, shoe_types: [...filtersSelections.shoe_types, typeId]});
    else setFiltersSelections({ ...filtersSelections, shoe_types: [...filtersSelections.shoe_types.slice(0, index), ...filtersSelections.shoe_types.slice(index + 1)]});
  }

  const handleFiltersContainerDisplay = () => {
    setHideFiltersContainerDisplay(!hideFiltersContainerDisplay);
  }

  const handleClearFilterSelections = (filter) => {
    setFiltersSelections({...filtersSelections, [filter]: [] });
  }

  useFetchCollections({
    apiRoute: apiRoute,
    filtersSelections: filtersSelections,
    setInventory: setInventory
  })


  return (
    <main className="collectionsMain">
      <div className="buttonContainer">
        <button className="toggleFilterContainerDisplay" onClick={handleFiltersContainerDisplay}>
          {hideFiltersContainerDisplay ? '+ Show Filters' : '< Hide Filters' }
        </button>
      </div>
      <div className="displayContainers">
        <div className={`filtersContainer ${hideFiltersContainerDisplay && 'hideDisplay'}`}>
          <FilterCheckOptionBlock
            filterName={'brand'}
            apiRoute={apiRoute}
            query={createBrandFilterQuery()}
            toggleSelection={handleBrandFilterSelection}
            filterSelections={currentPath.match(/[0-9a-fA-F]{24}$/) ? [] : filtersSelections.brand} // so that if the current collections page is for a specific brand, there will not be a way to clear the brand filters
            handleClearFilter={() => handleClearFilterSelections('brand')}
          />
          <FilterCheckOptionBlock
            filterName={'shoe_types'}
            apiRoute={apiRoute}
            query={retrieveFilterQuery('shoe_types')}
            toggleSelection={handleFootwearTypeFilterSelection}
            filterSelections={filtersSelections.shoe_types}
            handleClearFilter={() => handleClearFilterSelections('shoe_types')}
          />
        </div>
        <div className="productsContainer">
          {inventory.length > 0 && (
            inventory.map(shoe => (
              <ProductCard
                key={shoe.id}
                modelId={shoe._id}
                brand={shoe.brand.name}
                brandId={shoe.brand._id}
                model={shoe.model}
                price={shoe.price}
                albumURI={shoe.albumURI}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}