import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../App'; // Substituindo por HomePage real
import ProductsPage from '../pages/ProductsPage';
import DashboardPage from '../pages/DashboardPage';
import AddProductPage from '../pages/AddProductPage'; // Componente para cadastrar produtos

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} /> {/* Corrigido para "/products" */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/cadastrarProduto" element={<AddProductPage />} />
    </Routes>
  );
};

export default AppRoutes;
