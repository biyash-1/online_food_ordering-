"use client";

import { useState, useRef } from 'react';
import { Button, } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'react-hot-toast';

const AddProductForm = () => {
  const [meal, setMeal] = useState('lunch');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null as File | null,
    meal: ''
  });
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    formDataObj.append('meal', meal);

    try {
      const res = await fetch('http://localhost:3001/api/food/add', {
        method: 'POST',
        body: formDataObj,
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Food added successfully");
        // Reset form state
        setFormData({ 
          name: '', 
          price: '', 
          image: null,
          meal: '' 
        });
        setMeal('lunch');
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error:any) {
      setMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow">
      <h3 className="text-2xl font-semibold mb-4">Add Product</h3>
      <div className="mb-4">
        <label>Name</label>
        <Input 
          name="name" 
          placeholder="Product name" 
          value={formData.name}
          onChange={handleChange} 
        />
      </div>
      <div className="mb-4">
        <label>Price</label>
        <Input 
          name="price" 
          placeholder="Price" 
          value={formData.price}
          onChange={handleChange} 
        />
      </div>
      <div className='mb-4'>
        <label>Meal type</label>
        <Select 
          onValueChange={(value) => setMeal(value)}
          value={meal}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Meal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="desert">Dessert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label>Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          ref={fileInputRef}
          className="border p-2 rounded"
        />
      </div>
      <Button type="submit">Add Product</Button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddProductForm;