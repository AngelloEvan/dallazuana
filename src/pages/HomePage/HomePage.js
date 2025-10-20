import React, { useState, useEffect } from 'react'; 
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../../components/ProductCard/ProductCard'; 
import OrderSummary from '../../components/OrderSummary/OrderSummary';
// REMOVIDO: import productsData from '../../data/products'; 
import apiClient from '../../services/apiClient'; 

// --- Imagens Locais do Carrossel (PERMANECEM ESTÁTICAS) ---
import empadao from '../../assets/img/empadao.jpg';
import cafe3 from '../../assets/img/cafe3.jpg'; 
import boloFuba from '../../assets/img/boloFuba.jpg';
// ...
import './HomePage.css';


const HomePage = () => {
    // 1. ESTADOS PARA OS PRODUTOS EM DESTAQUE (DINÂMICOS)
    const [produtosDestaque, setProdutosDestaque] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    // 2. LÓGICA PARA BUSCAR OS PRODUTOS RECENTES NO BACKEND
    useEffect(() => {
        const fetchNovidades = async () => {
            try {
                // Chama o novo endpoint otimizado: /api/produtos/novidades
                const response = await apiClient.get('/produtos/novidades'); 
                
                // A resposta.data contém a lista de ProdutoDTOs (os 3 mais recentes)
                setProdutosDestaque(response.data); 
                
            } catch (err) {
                console.error("Erro ao buscar produtos em destaque:", err);
                setError("Não foi possível carregar os produtos. Verifique a conexão com a API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNovidades();
    }, []); // Executa apenas na montagem

    // 3. DADOS ESTÁTICOS DO CARROSSEL (PERMANECEM INALTERADOS)
    const carouselItems = [
        { id: 1, image: empadao, title: 'Empadão super cremoso', description: 'Confira nossa variadade em sabores!', link: '/produto/lancamento-exclusivo' },
        { id: 2, image: cafe3, title: 'Pratos incríveis', description: 'Aproveite as nossas promoções!', link: '/categoria/ofertas' },
        { id: 3, image: boloFuba, title: 'Bolos feitos com amor', description: 'Peça um pra compartilhar com as pessoas mais importantes!', link: '/categoria/inverno' },
    ];

    const carouselSettings = { /* ... (Suas configurações de carrossel) ... */ };
    
    
    // --- RENDERING CONDICIONAL E SECÇÕES ---
    if (isLoading) {
        return <div className="loading-page-container">Carregando catálogo de destaques...</div>;
    }

    if (error) {
        return <div className="error-page-container">Erro: {error}</div>;
    }


    return (
        <div className="home-page-container">
            {/* SEÇÃO DO CARROSSEL (ESTÁTICA) */}
            <section className="home-hero-section">
                <Carousel settings={carouselSettings}>
                    {carouselItems.map(item => (
                        <div key={item.id} className="carousel-slide-item">
                            <img src={item.image} alt={item.title} loading="lazy" />
                            <div className="carousel-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* SEÇÃO DE PRODUTOS EM DESTAQUE (DINÂMICA) */}
            <section className="featured-products-section">
                <h2>Novidades da Dona Empadinha</h2>
                {produtosDestaque.length === 0 ? (
                    <p>Nenhum produto em destaque encontrado. Adicione produtos no backend.</p>
                ) : (
                    <div className="product-list-grid">
                        {/* Mapeamos o estado 'produtosDestaque' que veio da API */}
                        {produtosDestaque.map(product => (
                            <ProductCard key={product.id} product={product} /> 
                        ))}
                    </div>
                )}
            </section>
            
            <section className="order-summary-section">
                <OrderSummary /> 
            </section>
            
            <section className="about-preview-section">
                <p>Nossa paixão por produtos de qualidade nos move a cada dia. Explore nossa loja e descubra o que temos de melhor para você!</p>
            </section>
        </div>
    );
};

export default HomePage;