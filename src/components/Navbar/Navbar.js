import React, { useState } from 'react'; // <<< IMPORTANTE: Importa useState
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { orderItems } = useOrder();
  const { logout, isAuthenticated } = useAuth();
  const totalItemsInOrder = orderItems.reduce((total, item) => total + item.quantity, 0);

  // ESTADO PARA CONTROLAR SE O MENU MOBILE ESTÁ ABERTO OU FECHADO
  const [click, setClick] = useState(false);

  // FUNÇÃO PARA ALTERNAR O ESTADO DO MENU (abrir/fechar)
  const handleClick = () => setClick(!click);

  // FUNÇÃO PARA FECHAR O MENU AO CLICAR EM UM LINK (em mobile)
  const closeMobileMenu = () => setClick(false);

  // FUNÇÃO PARA FAZER LOGOUT
  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo do Site: Um link para a página inicial */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> {/* Fecha o menu ao clicar no logo */}
          
         <img src="\logoescrito.png" alt="Dona Empadinha Logo" className="navbar-logo-image" />
        </Link>

        {/* Menu de Navegação Principal */}
        {/* Adiciona a classe 'active' se o menu estiver aberto, controlada pelo estado 'click' */}
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}> {/* Fecha o menu ao clicar */}
              Início
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/produtos" className="nav-links" onClick={closeMobileMenu}> {/* Fecha o menu ao clicar */}
              Produtos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contato" className="nav-links" onClick={closeMobileMenu}> {/* Fecha o menu ao clicar */}
              Contato
            </Link>
          </li>
          
          {/* Menu de Autenticação - Mostra diferentes opções baseado no status de login */}
          {isAuthenticated() ? (
            // Se o usuário estiver logado, mostra nome e opção de logout
            <>
           {/*   
                <span className="nav-links user-name">
                  👋 Olá, {user?.name || 'Usuário'}
                </span>
              
         */ }
              <li className="nav-item">
                <Link className="nav-links logout-button" onClick={handleLogout}>
                  Sair
                </Link>
              </li>
            </>
          ) : (
            // Se o usuário não estiver logado, mostra opções de login
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                  Entrar
                </Link>
              </li>
            </>
          )}
          
          {/* Item do Menu para o Pedido/Carrinho com o Contador */}
          <li className="nav-item">
            <Link to="/meu-pedido" className="nav-links cart-icon-link" onClick={closeMobileMenu}> {/* Fecha o menu ao clicar */}
              🛒
              {totalItemsInOrder > 0 && (
                <span className="cart-item-count">{totalItemsInOrder}</span>
              )}
            </Link>
          </li>
        </ul>

        {/* Ícone para Menu Responsivo (Hambúrguer) */}
        <div className="menu-icon" onClick={handleClick}> {/* Chama handleClick ao clicar */}
          {/* Altera o ícone baseado no estado 'click' */}
          {click ? '✖' : '☰'} {/* 'X' quando aberto, '☰' quando fechado */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;