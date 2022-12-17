import { useState } from 'react';
import { useFetchFilters } from '../../hooks/useFetchFilters';
import './filterCheckOptionBlock.css';

export default function FilterCheckOptionBlock(props) {
  const { filterName, apiRoute, query, toggleSelection, filterSelections, handleClearFilter } = props;
  
  const [options, setOptions] = useState([]);
  const [displayFilterBlock, setDisplayFilterBlock] = useState('displayBlock');
  
  let displayName;
  switch (filterName) {
    case 'brand':
      displayName = 'Brand';
      break;
    case 'shoe_types':
      displayName = 'Footwear';
      break;
    default:
      displayName = '';
  }

  const handleToggleDisplayBlock = () => {
    displayFilterBlock === 'displayBlock' ? setDisplayFilterBlock('hideBlock') : setDisplayFilterBlock('displayBlock');
  };

  useFetchFilters({
    filterName: filterName,
    apiRoute: apiRoute,
    query: query,
    setOptions: setOptions
  })
  
  
  return (
    <div className="filterOptionBlock">
      <div className="filterBlockTitle">
        <h3 tabIndex={0} role="button" onClick={handleToggleDisplayBlock}>
          <span className={`${displayFilterBlock}`}>
            {displayName}
          </span>
        </h3>
        {filterSelections.length > 0 && 
        <button className='clearFilterButton' onClick={handleClearFilter}>
          Clear
        </button>}
      </div>
      <div className={`filterBlockContent ${displayFilterBlock}`}>
        <div className="filterList">
          {options.length > 0 && (options.map(option => (
            <label htmlFor={`${option._id}`} className="filterOption" key={option._id}>
              <input 
                type="checkbox" 
                name={`${option._id}`} 
                id={`${option._id}`}
                onChange={() => toggleSelection(option._id)}
                checked={filterSelections.includes(option._id)}
              />
              {option.name}
            </label>
          )))}
        </div>
      </div>
    </div>   
  )
}