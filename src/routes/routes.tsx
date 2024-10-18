import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Adicione o 'Navigate'
import HomePage from '../App'; // Se você tiver uma HomePage
import ProductsPage from '../pages/Products/ProductsPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AddProductPage from '../pages/AddProduct/AddProductPage'; // Componente para cadastrar produtos
import Home from '../pages/Home/HomePage';
import Affiliate from '../pages/Affiliate/Affiliate';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redireciona da rota raiz "/" para "/products" */}
      <Route path="/" element={<Home />} /> 
      <Route path="/products" element={<ProductsPage />} /> 
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/cadastrarProduto" element={<AddProductPage />} />
      <Route path="/Affiliate" element={<Affiliate />} />
    </Routes>
  );
};

export default AppRoutes;
