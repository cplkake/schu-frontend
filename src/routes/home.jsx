import { Link } from "react-router-dom";
import useFetch from '../hooks/useFetch';
import { BrandCard, EmailSubscription, ProductCard } from '../components/index';
import 'atropos/css';
import '../index.css';

export default function Home() {
  const { data: inventory } = useFetch('/api/latest-new-arrivals');

  // fetch some brands to be displayed
  const numDisplayedBrands = 3;
  const { data: brands } = useFetch(`/api/brands?limit=${numDisplayedBrands}`);

  return (
    <main>
      <section className="heroSection">
        <Link to='collections'>
          <div className="heroContainer">
            <div className="heroText">
              <h1>SCHU</h1>
            </div>
          </div>
        </Link>
      </section>
      <section className="newArrivalsSection">
        <h3>New Arrivals</h3>
        <div className="productsContainer snaps-inline">
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
        <div className="view-all-container">
          <Link to={'/collections/new-arrivals'} className='view-all-btn'>
            View All
          </Link>
        </div>
      </section>
      <section className="brandsSection">
        <div className="brandsContainer">
              {brands.length > 0 && (
                brands.map(brand => (
                  <BrandCard
                    key={brand._id}
                    brandId={brand._id}
                    brand={brand.name}
                    picURL={brand.picURL}
                    
                  />
                ))
              )}
        </div>
      </section>
      <EmailSubscription />
    </main>
  );
};