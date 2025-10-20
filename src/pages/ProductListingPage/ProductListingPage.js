import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryNavbar from '../../components/CategoryNavbar/CategoryNavbar';
import apiClient from '../../services/apiClient';
import './ProductListingPage.css';

const ProductListingPage = () => {
  // Estados para gerenciar produtos e categorias
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca todos os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get('/produtos');
        
        // Garante que sempre seja um array
        const productsData = Array.isArray(response.data) ? response.data : [];
        
        setProducts(productsData);
        
        // Extrai categorias únicas dos produtos
        const uniqueCategories = ['Todos', ...new Set(productsData.map(product => product.category))];
        setCategories(uniqueCategories);
        
        // Define produtos filtrados inicialmente como todos os produtos
        setFilteredProducts(productsData);
        
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError('Não foi possível carregar os produtos. Verifique a conexão com a API.');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtra produtos quando a categoria selecionada muda
  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Função para lidar com a seleção de categoria
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Estados de loading e erro
  if (isLoading) {
    return (
      <div className="product-listing-page-container">
        <div className="loading-container">
          <h2>Carregando produtos...</h2>
          <p>Aguarde enquanto buscamos todos os nossos produtos para você!</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-listing-page-container">
        <div className="error-container">
          <h2>Erro ao carregar produtos</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-listing-page-container">
      <h2>Todos os Nossos Produtos</h2>

      {/* CategoryNavbar para filtrar por categoria */}
      <CategoryNavbar
        categories={categories}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      {/* Grid de produtos */}
      <div className="product-list-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products-message">
            <p>Nenhum produto encontrado na categoria "{selectedCategory}".</p>
            <button 
              onClick={() => setSelectedCategory('Todos')}
              className="show-all-button"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Informações sobre quantidade de produtos */}
      <div className="products-info">
        <p>
          Mostrando {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} 
          {selectedCategory !== 'Todos' && ` na categoria "${selectedCategory}"`}
        </p>
      </div>
    </div>
  );
};

export default ProductListingPage;