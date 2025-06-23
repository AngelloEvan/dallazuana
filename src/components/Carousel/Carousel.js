import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Estilos base do Slick
import 'slick-carousel/slick/slick-theme.css'; // Tema padrão do Slick
import './Carousel.css'; // Seus estilos customizados para este carrossel

const Carousel = ({ settings, children }) => {
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {children} {/* Renderiza os slides passados como filhos */}
      </Slider>
    </div>
  );
};

export default Carousel;