# Contexto do Projeto - Dona Empadinha

## 📋 Visão Geral
Este é um projeto de e-commerce para uma empresa de empadinhas artesanais chamada "Dona Empadinha". O projeto é desenvolvido em React.js e apresenta uma interface moderna e responsiva para venda de produtos alimentícios.

## 🏗️ Arquitetura do Projeto

### Tecnologias Utilizadas
- **React 19.1.0** - Framework principal
- **React Router DOM 7.6.2** - Roteamento
- **React Slick** - Carrossel de imagens
- **CSS3** - Estilização
- **Context API** - Gerenciamento de estado global

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Carousel/       # Carrossel de imagens
│   ├── CategoryNavbar/ # Navegação por categorias
│   ├── Navbar/         # Barra de navegação principal
│   ├── OrderSummary/   # Resumo do pedido
│   └── ProductCard/    # Card de produto
├── context/            # Context API para estado global
│   └── OrderContext.js # Gerenciamento do carrinho
├── data/               # Dados estáticos
│   └── products.js     # Catálogo de produtos
├── pages/              # Páginas da aplicação
│   ├── ContactPage/    # Página de contato
│   ├── HomePage/       # Página inicial
│   ├── ProductDetailPage/ # Detalhes do produto
│   ├── ProductListingPage/ # Listagem de produtos
│   └── SuccessPage/    # Página de sucesso
└── assets/             # Recursos estáticos
    └── img/            # Imagens dos produtos
```

## 🛒 Funcionalidades Principais

### 1. Sistema de Pedidos (OrderContext)
- **Estado Global**: Gerenciamento centralizado do carrinho de compras
- **Funcionalidades**:
  - Adicionar produtos ao pedido
  - Remover produtos do pedido
  - Atualizar quantidades
  - Calcular total do pedido
  - Persistência durante a navegação

### 2. Catálogo de Produtos
**Produtos Disponíveis**:
- **Doces**:
  - Empadinha de Brigadeiro (R$ 5,00)
  - Empadinha de Brigadeiro Branco (R$ 5,00)
- **Salgados**:
  - Empadinha de Camarão (R$ 5,00)
  - Empadinha de Calabresa (R$ 5,00)
  - Empadinha de Carne Seca (R$ 5,00)
  - Empadinha de Frango com Palmito (R$ 5,00)

### 3. Interface do Usuário
- **HomePage**: Carrossel promocional + produtos em destaque
- **Navegação**: Menu responsivo com contador de itens no carrinho
- **Cards de Produto**: Interface intuitiva para adicionar ao carrinho
- **Páginas Específicas**: Detalhes, listagem, contato e sucesso

## 🎨 Design e UX

### Características Visuais
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Carrossel Promocional**: Destaque para produtos especiais
- **Feedback Visual**: Animações ao adicionar produtos ao carrinho
- **Navegação Intuitiva**: Menu hambúrguer para mobile

### Elementos de Interface
- Logo personalizado "Dona Empadinha"
- Ícone de carrinho com contador de itens
- Cards de produto com imagens e preços
- Botões com feedback visual de interação

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
```javascript
// OrderContext fornece:
- orderItems: Array de produtos no carrinho
- addItemToOrder: Função para adicionar produtos
- removeItemFromOrder: Função para remover produtos
- updateItemQuantity: Função para alterar quantidades
- calculateOrderTotal: Função para calcular total
```

### Roteamento
- `/` - Página inicial
- `/produtos` - Listagem de produtos
- `/produto/:id` - Detalhes do produto
- `/contato` - Página de contato
- `/meu-pedido` - Resumo do pedido
- `/success` - Página de sucesso

### Responsividade
- Menu hambúrguer para dispositivos móveis
- Grid responsivo para produtos
- Carrossel adaptável
- Layout flexível

## 📱 Experiência do Usuário

### Fluxo de Compra
1. **Exploração**: Usuário navega pela homepage e vê produtos em destaque
2. **Seleção**: Clica em produtos para ver detalhes ou adiciona diretamente ao carrinho
3. **Carrinho**: Visualiza itens selecionados com quantidades e total
4. **Finalização**: Acessa página de sucesso após completar pedido

### Interações
- **Adicionar ao Carrinho**: Feedback visual com mudança de texto do botão
- **Contador de Itens**: Atualização em tempo real no ícone do carrinho
- **Navegação**: Menu responsivo com fechamento automático

## 🎯 Objetivos do Negócio

### Público-Alvo
- Clientes interessados em empadinhas artesanais
- Pessoas que valorizam produtos caseiros e de qualidade
- Mercado local e regional

### Diferenciais
- Produtos artesanais com ingredientes selecionados
- Variedade de sabores doces e salgados
- Interface moderna e fácil de usar
- Preços acessíveis (R$ 5,00 por unidade)

## 🚀 Próximos Passos Sugeridos

### Melhorias Técnicas
- Implementar backend para persistência de dados
- Adicionar sistema de autenticação de usuários
- Integrar gateway de pagamento
- Implementar sistema de avaliações

### Melhorias de UX
- Adicionar filtros por categoria
- Implementar busca de produtos
- Adicionar wishlist/favoritos
- Melhorar página de checkout

### Funcionalidades de Negócio
- Sistema de cupons de desconto
- Programa de fidelidade
- Notificações de novos produtos
- Integração com redes sociais

## 📊 Status Atual
- ✅ Frontend completo e funcional
- ✅ Sistema de carrinho implementado
- ✅ Design responsivo
- ✅ Navegação entre páginas
- ⏳ Backend e integrações pendentes
- ⏳ Sistema de pagamento pendente
- ⏳ Deploy em produção pendente

---

*Este contexto foi gerado automaticamente baseado na análise do código fonte do projeto Dona Empadinha.*

