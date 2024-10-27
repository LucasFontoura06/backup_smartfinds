import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';

// Páginas públicas
import Home from '../pages/Home/HomePage';
import ProductList from '../pages/Produtos/ProdutosPage';
import TeamPage from '../pages/Developer/TeamPage';
import LoginPage from '../pages/Login/LoginPage';

// Páginas privadas (requerem autenticação)
import ProductsPage from '../pages/ProductsLIst/ProductsListPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AddProductPage from '../pages/AddProduct/AddProductPage';
import Affiliate from '../pages/Affiliate/Affiliate';
import UsersPage from '../pages/Users/UsersPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<ProductList />} />
      <Route path="/developer" element={<TeamPage />} />
      <Route path="/Login" element={<LoginPage />} />

      {/* Rotas Privadas */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
      <Route path="/cadastrarProduto" element={<PrivateRoute><AddProductPage /></PrivateRoute>} />
      <Route path="/affiliate" element={<PrivateRoute><Affiliate /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;
