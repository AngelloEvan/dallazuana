import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItemToOrder } = useOrder();
  const [isAdding, setIsAdding] = useState(false);// Estado para controlar o feedback visual do botão
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Impede que o clique no botão ative o link do cartão
    e.stopPropagation(); // Impede que o clique "suba" para o link do cartão
  
    // 1. Ativa o estado de "adicionando"
    setIsAdding(true);
    addItemToOrder(product);
    console.log(`Produto ${product.name} adicionado ao pedido.`);

    // 2. Reseta o estado de "adicionando" após um pequeno atraso
    setTimeout(() => {
      setIsAdding(false);
    }, 500); // O efeito dura 500ms (0.5 segundos)
  
  };

  return (
    // O cartão inteiro continua sendo um link para a página de detalhes do produto
    <Link to={`/produto/${product.id}`} className="product-card">
      <div className="product-card-image-container">
        <img src={product.imageUrl} alt={product.name} className="product-card-image" />
      </div>
      <div className="product-card-details">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
       
        <button
          className={`product-card-button ${isAdding ? 'adding-effect' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding} // Desabilita o botão brevemente para evitar cliques múltiplos
        >
          {isAdding ? 'Adicionado!' : 'Adicionar'} {/* Muda o texto do botão */}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;