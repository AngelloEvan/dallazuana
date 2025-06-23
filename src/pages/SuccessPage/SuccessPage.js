import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  return (
    <div className="success-page-container">
      <h2>Mensagem Enviada com Sucesso!</h2>
      <p>Agradecemos seu contato. Em breve, retornaremos sua mensagem.</p>
      <Link to="/" className="back-home-button">Voltar à Página Inicial</Link>
    </div>
  );
};

export default SuccessPage;