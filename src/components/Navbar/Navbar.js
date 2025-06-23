import React from 'react';
import { Link } from 'react-router-dom'; // Importa o componente Link para navegação
import { useOrder } from '../../context/OrderContext'; // Importa o hook useOrder para acessar o estado do pedido
import './Navbar.css'; // Importa os estilos CSS para a Navbar

const Navbar = () => {
  // Pega os itens do pedido do OrderContext
  const { orderItems } = useOrder();

  // Calcula a quantidade total de itens no pedido somando as quantidades de cada produto.
  // Se não houver itens, o total será 0.
  const totalItemsInOrder = orderItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo do Site: Um link para a página inicial */}
        <Link to="/" className="navbar-logo">
          Dallazuana {/* Você pode mudar o nome da sua loja aqui */}
        </Link>

        {/* Menu de Navegação Principal */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Início
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/produtos" className="nav-links">
              Produtos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contato" className="nav-links">
              Contato
            </Link>
          </li>
          {/* Item do Menu para o Pedido/Carrinho com o Contador */}
          <li className="nav-item">
            <Link to="/meu-pedido" className="nav-links cart-icon-link">
              🛒 {/* Ícone de carrinho - você pode substituir por um ícone SVG mais profissional */}
              {/* Exibe o contador apenas se houver 1 ou mais itens no pedido */}
              {totalItemsInOrder > 0 && (
                <span className="cart-item-count">{totalItemsInOrder}</span>
              )}
            </Link>
          </li>
        </ul>

        {/* Ícone para Menu Responsivo (Hambúrguer) - Lógica JS será adicionada depois */}
        <div className="menu-icon">
          ☰ {/* Caractere Unicode para o ícone de hambúrguer */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;