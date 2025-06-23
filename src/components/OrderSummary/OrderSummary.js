import React from 'react';
import { useOrder } from '../../context/OrderContext'; // Importa o hook para acessar o estado do pedido
import './OrderSummary.css'; // Estilos para o resumo do pedido

const OrderSummary = () => {
  const { orderItems, removeItemFromOrder, updateItemQuantity, calculateOrderTotal } = useOrder();

  // Função para lidar com o aumento de quantidade
  const handleIncrease = (productId, currentQuantity) => {
    updateItemQuantity(productId, currentQuantity + 1);
  };

  // Função para lidar com a diminuição de quantidade
  const handleDecrease = (productId, currentQuantity) => {
    updateItemQuantity(productId, currentQuantity - 1); // A função já remove se for <= 0
  };

  // Função para gerar a mensagem do WhatsApp (implementaremos completamente depois)
  const generateWhatsAppMessage = () => {
    if (orderItems.length === 0) {
      alert('Seu pedido está vazio!');
      return;
    }

    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    orderItems.forEach(item => {
      message += `- ${item.name} (Quant: ${item.quantity}) - ${item.price}\n`;
    });
    message += `\nTotal Estimado: R$ ${calculateOrderTotal().toFixed(2).replace('.', ',')}`;
    message += "\n\nPor favor, me informe a disponibilidade e os próximos passos para a compra. Obrigado!";

    // Codifica a mensagem para ser usada em uma URL
    const encodedMessage = encodeURIComponent(message);
    // Número de telefone para o qual o pedido será enviado (substitua pelo seu!)
    const phoneNumber = "554198443944"; // Exemplo: +55 (DDD) XXXXX-XXXX

    // Abre o WhatsApp com a mensagem pré-preenchida
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
  };


  if (orderItems.length === 0) {
    return (
      <div className="order-summary-container empty">
        <h3>Seu Pedido</h3>
        <p>Nenhum item adicionado ainda.</p>
      </div>
    );
  }

  return (
    <div className="order-summary-container">
      <h3>Seu Pedido</h3>
      <div className="order-items-list">
        {orderItems.map(item => (
          <div key={item.productId} className="order-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price}</span>
            <div className="item-quantity-controls">
              <button onClick={() => handleDecrease(item.productId, item.quantity)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item.productId, item.quantity)}>+</button>
              <button className="remove-item-btn" onClick={() => removeItemFromOrder(item.productId)}>Remover</button>
            </div>
          </div>
        ))}
      </div>
      <div className="order-total">
        <span>Total:</span>
        <span className="total-amount">R$ {calculateOrderTotal().toFixed(2).replace('.', ',')}</span>
      </div>
      <button className="whatsapp-button" onClick={generateWhatsAppMessage}>
        Enviar Pedido via WhatsApp
      </button>
    </div>
  );
};

export default OrderSummary;