import React, { createContext, useState, useContext } from 'react';

// 1. Cria o Context
const OrderContext = createContext();

// 2. Cria o Provider (Componente que irá fornecer o estado para seus filhos)
export const OrderProvider = ({ children }) => {
  // Estado para armazenar os itens do pedido
  // Cada item no array terá: { productId: id, name: 'Nome', price: 'R$ X,XX', quantity: N }
  const [orderItems, setOrderItems] = useState([]);

  // Função para adicionar um item ao pedido
  const addItemToOrder = (productToAdd) => {
    setOrderItems((prevItems) => {
      // Verifica se o item já está no pedido
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === productToAdd.id
      );

      if (existingItemIndex > -1) {
        // Se o item já existe, aumenta a quantidade
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Se o item não existe, adiciona-o com quantidade 1
        return [
          ...prevItems,
          {
            productId: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  // Função para remover um item do pedido (se necessário no futuro)
  const removeItemFromOrder = (productId) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  // Função para aumentar ou diminuir a quantidade de um item
  const updateItemQuantity = (productId, newQuantity) => {
    setOrderItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.productId !== productId);
      }
      return prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Calcula o total do pedido (para exibir no "carrinho")
  const calculateOrderTotal = () => {
    return orderItems.reduce((total, item) => {
      // Converte o preço para número (removendo "R$", vírgulas e pontos)
      const priceNum = parseFloat(
        item.price.replace('R$', '').replace('.', '').replace(',', '.')
      );
      return total + priceNum * item.quantity;
    }, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        addItemToOrder,
        removeItemFromOrder,
        updateItemQuantity,
        calculateOrderTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// 3. Cria um Custom Hook para facilitar o consumo do Context
export const useOrder = () => {
  return useContext(OrderContext);
};