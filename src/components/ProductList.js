// ProductList.js
import React from 'react';
import { useQuery } from 'react-query';

const ProductList = () => {
  const { data: products, isLoading, isError } = useQuery('products', async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if (!Array.isArray(products)) {
    // Handle the case where products is not an array
    console.error('Products data is not an array:', products);
    return null;
  }

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            {/* <p>{product.body}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
