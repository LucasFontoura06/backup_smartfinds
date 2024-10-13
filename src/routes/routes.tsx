import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Adicione o 'Navigate'
import HomePage from '../App'; // Se você tiver uma HomePage
import ProductsPage from '../pages/ProductsPage';
import DashboardPage from '../pages/DashboardPage';
import AddProductPage from '../pages/AddProductPage'; // Componente para cadastrar produtos

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redireciona da rota raiz "/" para "/products" */}
      <Route path="/" element={<Navigate to="/products" replace />} /> 
      <Route path="/products" element={<ProductsPage />} /> 
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/cadastrarProduto" element={<AddProductPage />} />
    </Routes>
  );
};

export default AppRoutes;
