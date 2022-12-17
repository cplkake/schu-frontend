import './shoeSizeOption.css';

export default function shoeSizeOption({ size, inStock, handleClick, selected }) {

  return (
    <div 
      className={`productSizeOption ${inStock && 'inStock'} ${selected && 'selected'}`} 
      onClick={() => handleClick(size)}
    >
      {size}
    </div>
  )
}