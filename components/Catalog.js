import { useCatalogData } from "../hooks/useCatalog";
import ProductThumb from "./ProductThumb";

const Catalog = () => {
  const { productData } = useCatalogData();
  const addToCart = (id) => console.log(id);

  return (
    <div>
      <h2>{productData.title}</h2>
      {productData.products.map((product) => (
        <ProductThumb key={product.id} {...product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Catalog;
