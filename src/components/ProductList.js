// ProductList.js
import React from 'react';
import { useQuery } from 'react-query';
import './ProductList.css'

const ProductList = ({addProduct=[]}) => {
  const { data: products, isLoading, isError } = useQuery('products', async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // console.log('response.json()', await response.json())
    return await response.json();
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if (!Array.isArray(products?.products)) {
    // Handle the case where products is not an array
    console.error('Products data is not an array:', products);
    return null;
  }


  return (
    <div className='product-list-container'> 
      <h2 className='product-list-title'>Product List</h2>
      <ul className='product-item'>
        {[...addProduct , ...products?.products]?.map((product) => (
          <li key={product.title}>
            <h3>{product.title}</h3>
            {/* <p>{product.body}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
