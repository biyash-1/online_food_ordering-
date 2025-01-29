// admin/components/AddProductForm.tsx
"use client";

import { useState } from 'react';
import { Button, } from '../components/ui/button';
import { Input } from '../components/ui/input';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('price', formData.price);
    if (formData.image) formDataObj.append('image', formData.image);

    try {
      const res = await fetch('http://localhost:3001/api/food/add', {
        method: 'POST',
        body: formDataObj,
      });
      const result = await res.json();
      if (res.ok) {
        setMessage("Food added successfully!");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("Failed to add food.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4  rounded shadow">
      <h3 className="text-2xl font-semibold mb-4">Add Product</h3>
      <div className="mb-4">
        <label>Name</label>
        <Input name="name" placeholder="Product name" onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label>Price</label>
        <Input name="price" placeholder="Price" onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label>Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <Button type="submit">Add Product</Button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddProductForm;
