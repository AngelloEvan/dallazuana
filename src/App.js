import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductListingPage from './pages/ProductListingPage/ProductListingPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import OrderSummary from './components/OrderSummary/OrderSummary';
import Navbar from './components/Navbar/Navbar';
import { OrderProvider } from './context/OrderContext';
import './App.css';

function App() {
  return (
    <Router>
      <OrderProvider>
        <div className="App"> 
          <div className="navbar-wrapper"></div>
            <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produtos" element={<ProductListingPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/produto/:id" element={<ProductDetailPage />} />
              <Route path="/meu-pedido" element={<OrderSummary />} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <p>&copy; 2025 Meu Site de Produtos. Todos os direitos reservados.</p>
          </footer>
        </div>
      </OrderProvider>
    </Router>
  );
}

export default App;