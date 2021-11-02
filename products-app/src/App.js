import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Product from './Product.js';
import './App.css';

const API_URL = 'https://products-api-01.herokuapp.com/api/products';

function App() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Fetch API data on page load
  useEffect(() => {
    const getProducts = async () => {
      const resp = await axios.get(API_URL);
      setProducts(resp.data);
      setFilteredProducts(resp.data);
    }
    getProducts();
  }, []);

  // Handle search inputs
  // Two examples were referenced when creating this function
  // Example 1: https://www.emgoto.com/react-search-bar/
  // Example 2: https://levelup.gitconnected.com/how-to-search-filter-through-data-in-react-26f1545fe3a1
  const handleSearch = (event) => {
    // First pass event to value and convert to lowercase
    let value = event.target.value.toLowerCase();
    // Create result variable and set to empty string
    let result = [];
    // Assign a filtered products array to result
    result = products.filter((product) => {
      // First convert product names to lowercase to compare lowercase to lowercase
      const productName = product.name.toLowerCase();
      // Return the products that contain the search value (-1 is no match at all)
      return productName.search(value) !== -1;
    });
    // Set the state of filteredProducts to the result
    setFilteredProducts(result);
  }

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
          {/* When value of entered text changes pass it to the handleSearch function */}
          <input type="text" name="Search" placeholder="Search" onChange={(event) => handleSearch(event)} />

          {/* Product Grid */}
          <ul className="product-grid">
            {filteredProducts.map((product, index) => (
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

        {/* Product Details */}
        <Route path="/product/:id">
          <Product products={products} />
        </Route>

      </main>

    </div>
  );
}

export default App;
