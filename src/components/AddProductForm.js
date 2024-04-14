import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import './AddProductForm.css';

const AddProductForm = ({responseData}) => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: ''
  });

  const { title, description, price } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation((newProduct) => {
    // Simulate posting data to the API
    console.log('Posting new product:', newProduct);
    // Replace this with your actual API call
    return fetch('https://dummyjson.com/products/add', { method: 'POST', body: JSON.stringify(newProduct) })
      .then(response => response.json()); // Parse response as JSON
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    setFormData({ title: '', description: '', price: '' }); // Reset form after submission
  };

  useEffect(()=> {
    if(mutation.isSuccess){
      responseData({...mutation.data, ...mutation.variables})
    }

  }, [mutation.isSuccess])

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-field'>
        <input className='form-field' type="text" name="title" value={title} onChange={handleChange} placeholder="Product Name" />
        <input className='form-field' type="text" name="description" value={description} onChange={handleChange} placeholder="Description" />
        <input className='form-field' type="text" name="price" value={price} onChange={handleChange} placeholder="Price" />
        </div>
        <button className='submit-button' type="submit">Add Product</button>
      </form>
      {mutation.isSuccess && (
        <div>
          <p>Product added successfully!</p>
          {/* <p>Title: {mutation.data.title}</p>
          <p>Description: {mutation.data.description}</p>
          <p>Price: {mutation.data.price}</p> */}
        </div>
      )}
      {mutation.isError && <p>Error adding product: {mutation.error.message}</p>}
    </div>
  );
};

export default AddProductForm;
