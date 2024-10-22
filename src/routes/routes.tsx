import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Adicione o 'Navigate'
import HomePage from '../App'; // Se você tiver uma HomePage
import ProductsPage from '../pages/ProductsLIst/ProductsListPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AddProductPage from '../pages/AddProduct/AddProductPage'; // Componente para cadastrar produtos
import Home from '../pages/Home/HomePage';
import Affiliate from '../pages/Affiliate/Affiliate';

import ProductList from '../pages/Produtos/ProdutosPage';
import DeveloperPage from '../pages/Developer/DeveloperPage';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redireciona da rota raiz "/" para "/products" */}
      <Route path="/" element={<Home />} /> 
      <Route path="/produtos" element={<ProductList />} /> 
      <Route path="/products" element={<ProductsPage />} /> 
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/cadastrarProduto" element={<AddProductPage />} />
      <Route path="/Affiliate" element={<Affiliate />} />
      <Route path="/developer" element={<DeveloperPage />} />
    </Routes>
  );
};

export default AppRoutes;
