import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductListingPage from './pages/ProductListingPage/ProductListingPage';
import ContactPage from './pages/ContactPage/ContactPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import OrderSummary from './components/OrderSummary/OrderSummary';
import Navbar from './components/Navbar/Navbar';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrderProvider>
          <div className="App"> 
            <div className="navbar-wrapper"></div>
              <Navbar />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/produtos" element={<ProductListingPage />} />
                <Route path="/contato" element={<ContactPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/produto/:id" element={<ProductDetailPage />} />
                <Route path="/meu-pedido" element={<OrderSummary />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            
            <footer className="app-footer">
              <p>&copy; 2025 Meu Site de Produtos. Todos os direitos reservados.</p>
            </footer>
          </div>
        </OrderProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;