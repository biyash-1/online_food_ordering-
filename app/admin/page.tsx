"use client";
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AddProductForm from '../../components/AddProductForm';
import ListProducts from '../../components/ListProducts';
import ListOrder from '../../components/listOrder';
import Dashboard from '@/components/Dashboard'; // Correct import

const AdminPage = () => {
  // Updated type to include "dashboard"
  const [activeComponent, setActiveComponent] = useState<
    'addProduct' | 'listProducts' | 'listOrder' | 'dashboard'
  >('dashboard');

  return (
    <div className="flex">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {/* Render component based on activeComponent state */}
        {activeComponent === 'dashboard' && <Dashboard />}
        {activeComponent === 'addProduct' && <AddProductForm />}
        {activeComponent === 'listProducts' && <ListProducts />}
        {activeComponent === 'listOrder' && <ListOrder />}
      </div>
    </div>
  );
};

export default AdminPage;
