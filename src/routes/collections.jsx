import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductCard, FilterCheckOptionBlock } from '../components/index';
import { useFetchCollections } from "../hooks/useFetchCollections";
import useWindowDimensions from '../hooks/useWindowDimensions';
import '../index.css';

export default function Collections() {
  const defaultFiltersSelection = { brand: [], shoe_types: [] };
  const { width } = useWindowDimensions();
  const toHideFiltersContainer = width < 768 ? true : false;

  const [filtersSelections, setFiltersSelections] = useState(defaultFiltersSelection);
  const [inventory, setInventory] = useState([]);
  const [hideFiltersContainerDisplay, setHideFiltersContainerDisplay] = useState(toHideFiltersContainer);
  const brandFilterQuery = updateFilterQuery('brand');
  const typeFilterQuery = updateFilterQuery('shoe_types');
  let apiRoute = '';
  const currentPath = useLocation().pathname;

  if (currentPath === '/collections') apiRoute='/api/collections/all';
  else if (currentPath === '/collections/new-arrivals') apiRoute='/api/new-arrivals';
  else apiRoute=`/api/collections/${currentPath.match(/[^/]+(?=a$|$)/)[0]}`;

  console.log(currentPath)
  console.log(`apiRoute is ${apiRoute}`)

  function updateFilterQuery(filter) {
    let query = '?'
    for (const [key, valueArray] of Object.entries(filtersSelections)) {
      if (key !== filter)
        if (valueArray.length) query = query.concat(valueArray.reduce((string, value) => string.concat(`${key}=${value}&`), ''));
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
            query={brandFilterQuery}
            toggleSelection={handleBrandFilterSelection}
            filterSelections={filtersSelections.brand}
            handleClearFilter={() => handleClearFilterSelections('brand')}
          />
          <FilterCheckOptionBlock
            filterName={'shoe_types'}
            apiRoute={apiRoute}
            query={typeFilterQuery}
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