import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Para pegar o ID da URL
import productsData from '../../data/products'; // Importa os dados dos produtos
import './ProductDetailPage.css'; // Estilos para a página de detalhes

const ProductDetailPage = () => {
  const { id } = useParams(); // Pega o 'id' da URL (ex: /produto/1)

  // Encontra o produto correspondente no array de dados
  const product = productsData.find(p => p.id === parseInt(id));

  // Se o produto não for encontrado, exibe uma mensagem
  if (!product) {
    return (
      <div className="product-detail-container">
        <h2>Produto não encontrado :(</h2>
        <p>Parece que o produto que você está procurando não existe ou foi removido.</p>
      </div>
    );
  }

  // Se o produto for encontrado, exibe seus detalhes
  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-image-gallery">
          <img src={product.imageUrl} alt={product.name} className="main-product-image" />
          {/* Futuramente: galeria de imagens secundárias */}
        </div>
        <div className="product-detail-info">
          <h2 className="product-detail-name">{product.name}</h2>
          <p className="product-detail-price">{product.price}</p>
          <p className="product-detail-description">{product.description}</p>
           <Link to="/" className="back-to-home-button">Voltar</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;