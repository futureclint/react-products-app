import { useParams } from 'react-router-dom';

function Product ({products}) {

  // Get id from URL and assign to variable
  const {id} = useParams();

  const product = products.find((product) => product._id === id);

  return (
    <div className="product">
      { product ?
        <div className="product-info">
          <img src={product.imgURL} width="200" alt={product.name} />
          <h2>{product.name}</h2>
          <span>{product.price}</span>
          <p>{product.description}</p>
        </div>
        : <em>Loading</em>
      }
    </div>
  );
}

export default Product;
