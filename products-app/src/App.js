import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Product from './Product.js';
import './App.css';

const API_URL = 'https://products-api-01.herokuapp.com/api/products';

function App() {

  const [products, setProducts] = useState([]);

  // Fetch API data on page load
  useEffect(() => {
    const getProducts = async () => {
      const resp = await axios.get(API_URL);
      setProducts(resp.data);
    }
    getProducts();
  }, []);

  return (
    <div className="App">

      {/* Header */}
      <header>
        <Link to="/">
          <h1>ProductsApp</h1>
        </Link>
      </header>

      <main>

        <Route path="/" exact>
          {/* Search Box */}
          <form>
            <input type="text" name="Search" placeholder="Search" />
          </form>

          {/* Product Grid */}
          <ul className="product-grid">
            {products.map((product) => (
              <li key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img src={product.imgURL} width="100" alt={product.name} />
                  <h3>{product.name}</h3>
                  <span>{product.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Route>

        <Route path="/product/:id">
          <Product products={products} />
        </Route>

      </main>

    </div>
  );
}

export default App;
