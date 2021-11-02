import { useParams } from 'react-router-dom';

function Product ({products}) {

  // Get id from URL and assign to variable
  const {id} = useParams();

  const product = products.find((product) => product._id === id);

  return (
    <div>
      { product ?
        <div className="product">
          <div className="product-image">
            <img src={product.imgURL} width="200" alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
          </div>
        </div>
        : <em>Something went wrong</em>
      }
    </div>
  );
}

export default Product;
