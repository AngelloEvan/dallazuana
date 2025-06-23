import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../../components/ProductCard/ProductCard'; 
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import productsData from '../../data/products'; 


// --- Importe suas imagens locais aqui ---
import empadao from '../../assets/img/empadao.jpg';
import cafe3 from '../../assets/img/cafe3.jpg'; 
import boloFuba from '../../assets/img/boloFuba.jpg';
    
// Adicione mais imports para cada imagem de produto que você tiver!

import './HomePage.css';

const HomePage = () => {
  const carouselItems = [
    // ... (Seus itens do carrossel permanecem aqui)
    {
      id: 1,
      image: empadao,
      title: 'Empadão super cremoso',
      description: 'Confira nossa variadade em sabores!',
      link: '/produto/lancamento-exclusivo'
    },
    {
      id: 2,
      image: cafe3,
      title: 'Pratos incríveis',
      description: 'Aproveite as nossas promoções!',
      link: '/categoria/ofertas'
    },
    {
      id: 3,
      image: boloFuba,
      title: 'Bolos feitos com amor',
      description: 'Peça um pra compartilhar com as pessoas mais importantes!',
      link: '/categoria/inverno'
    },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    fade: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  const featuredProducts = productsData.filter(product => product.featured);
  return (
    <div className="home-page-container">
      <section className="home-hero-section">
        <Carousel settings={carouselSettings}>
          {carouselItems.map(item => (
            <div key={item.id} className="carousel-slide-item">
              
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="carousel-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              
            </div>
          ))}
        </Carousel>
      </section>

      <section className="featured-products-section">
        <h2>Produtos em Destaque</h2>
        {/* Container para os ProductCards */}
        <div className="product-list-grid">
          {featuredProducts.map(product => (
            // Para cada produto no array, renderizamos um ProductCard
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

           {/* SEÇÃO DO RESUMO DO PEDIDO: */}
      <section className="order-summary-section">
        <OrderSummary /> {/* <<< Renderiza o componente OrderSummary aqui */}
      </section>
      
      <section className="about-preview-section">
        <h2>Conheça Nossa História</h2>
        <p>Nossa paixão por produtos de qualidade nos move a cada dia. Explore nossa loja e descubra o que temos de melhor para você!</p>
      </section>
    </div>
  );
};

export default HomePage;