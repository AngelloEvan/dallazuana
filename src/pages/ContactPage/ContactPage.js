import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page-container">
      <h2>Fale Conosco</h2>
      <p>Envie suas dúvidas, sugestões ou entre em contato para mais informações sobre nossos produtos.</p>

      <div className="contact-content">
        {/* Formulário de Contato */}
        <div className="contact-form-section">
          <h3>Envie uma Mensagem</h3>
          {/* AS MUDANÇAS SÃO AQUI, NA TAG FORM */}
          <form className="contact-form" name="contact" method="POST" data-netlify="true">
            {/* CAMPO ESCONDIDO NECESSÁRIO PARA O NETLIFY FORMS */}
            <input type="hidden" name="form-name" value="contact" />
            
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

        {/* Informações de Contato Adicionais */}
        <div className="contact-info-section">
          <h3>Nossos Contatos</h3>
          <p>Se preferir, entre em contato pelos canais abaixo:</p>
          <div className="contact-details">
            <p><strong>E-mail:</strong> contato@dallazuana.com</p>
            <p><strong>Telefone:</strong> (41) 99844-3944</p>
            <p><strong>Endereço:</strong> Pinheirinho, Curitiba/PR</p>
            <p><strong>Horário de Atendimento:</strong> Seg-Sex: 9h-18h</p>
          </div>

          {/* Ícones de Redes Sociais */}
          <div className="social-media-links">
            <h3>Siga-nos:</h3>
            <a href="https://instagram.com/donaempadinha_" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
              <img src="https://img.icons8.com/ios-filled/50/007bff/instagram-new.png" alt="Instagram" />
            </a>
            {/* Adicione mais ícones conforme necessário */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;