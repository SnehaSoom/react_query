// AddProductForm.js
import React from 'react';
import { useMutation } from 'react-query';

const AddProductForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: ''
  });

  const { name, description, price } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation((newProduct) => {
    // Simulate posting data to the API
    console.log('Posting new product:', newProduct);
    // Replace this with your actual API call
    return fetch('https://dummyjson.com/products', { method: 'POST', body: JSON.stringify(newProduct) })
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    setFormData({ name: '', description: '', price: '' }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={handleChange} placeholder="Product Name" />
      <input type="text" name="description" value={description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="price" value={price} onChange={handleChange} placeholder="Price" />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
