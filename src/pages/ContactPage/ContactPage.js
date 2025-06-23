import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page-container">
      <h2>Fale Conosco</h2>
      <p>Envie suas dúvidas, sugestões ou entre em contato para mais informações sobre nossos produtos.</p>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Seu Nome:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Seu E-mail:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensagem:</label>
          <textarea id="message" name="message" rows="6" required></textarea>
        </div>
        <button type="submit" className="submit-button">Enviar Mensagem</button>
      </form>
    </div>
  );
};

export default ContactPage;