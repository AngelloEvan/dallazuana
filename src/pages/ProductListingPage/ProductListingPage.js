import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryNavbar from '../../components/CategoryNavbar/CategoryNavbar'; // Importa o novo CategoryNavbar
import productsData from '../../data/products';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Obter todas as categorias únicas dos produtos
  // Garantir que 'Todos' seja sempre a primeira opção
  const allCategories = ['Todos', ...new Set(productsData.map(product => product.category))].sort(); // Opcional: .sort() para ordenar alfabeticamente

  // Efeito para filtrar os produtos sempre que a categoria selecionada mudar
  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredProducts(productsData);
    } else {
      setFilteredProducts(productsData.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]); // Dependência: roda quando selectedCategory muda

  // Função para lidar com a seleção de categoria pela CategoryNavbar
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="product-listing-page-container">
      <h2>Todos os Nossos Produtos</h2>

      {/* NOVO COMPONENTE: CategoryNavbar */}
      <CategoryNavbar
        categories={allCategories}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      <div className="product-list-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;