import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import apiClient from '../../services/apiClient';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItemToOrder } = useOrder();
  
  // Estados para gerenciar o produto e loading
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingoCart, setIsAddingToCart] = useState(false);

  // Busca os dados do produto na API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/produtos/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setError('Produto não encontrado ou erro ao carregar dados.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Função para adicionar produto ao carrinho
  const handleAddToCart = async (e) => {
    e.preventDefault();
    
    if (!product) return;

    setIsAddingToCart(true);
    try {
      addItemToOrder(product);
      console.log(`Produto ${product.name} adicionado ao pedido.`);
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    } finally {
      // Feedback visual
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    }
  };

  // Função para voltar à tela anterior
  const handleGoBack = () => {
    // Verifica se há histórico para voltar
    if (window.history.length > 1) {
      navigate(-1); // Volta para a página anterior
    } else {
      // Se não há histórico, vai para a página inicial
      navigate('/');
    }
  };

  // Função alternativa mais robusta (opcional)
  const handleGoBackAlternative = () => {
    // Verifica o referrer (página que trouxe o usuário)
    if (document.referrer && document.referrer.includes(window.location.origin)) {
      navigate(-1);
    } else {
      // Fallback para página inicial
      navigate('/');
    }
  };

  // Estados de loading e erro
  if (isLoading) {
    return (
      <div className="product-detail-container">
        <div className="loading-container">
          <h2>Carregando produto...</h2>
          <p>Aguarde enquanto buscamos as informações do produto.</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <h2>Produto não encontrado</h2>
          <p>{error || 'Parece que o produto que você está procurando não existe ou foi removido.'}</p>
          <Link to="/produtos" className="back-to-products-button">
            Ver todos os produtos
          </Link>
        </div>
      </div>
    );
  }

  // Renderização do produto encontrado
  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-image-gallery">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="main-product-image"
            loading="lazy"
          />
          {/* Futuramente: galeria de imagens secundárias */}
        </div>
        <div className="product-detail-info">
          <h2 className="product-detail-name">{product.name}</h2>
      
         
              <p className="category-label">Categoria: <span className="category-value">{product.category}</span></p>
              

          
          
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">{product.price}</p>

          
          
         
     
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
           <button 
             onClick={handleGoBack}
             className="back-button"
           >
             ← Voltar
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;