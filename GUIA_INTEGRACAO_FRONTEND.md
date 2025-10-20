# 🚀 Guia de Integração Frontend - Backend Dona Empadinha

## 📋 Resumo das Alterações Implementadas

O backend foi atualizado para ser **100% compatível** com o frontend. Todas as alterações foram implementadas sem necessidade de mudanças no banco de dados.

---

## 🔐 **1. Endpoints de Autenticação**

### **POST /api/auth/login**
**Descrição**: Login do usuário com email e senha

**Payload:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": 123,
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "phone": "11999999999",
  "cpf": "123.456.789-09"
}
```

**Resposta de Erro (401):**
```json
"Credenciais inválidas"
```

---

### **POST /api/auth/criar-login-cliente**
**Descrição**: Registro de novo cliente

**Payload:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "nome": "Nome Completo",
  "telefone": "11999999999",
  "cpf": "123.456.789-09"
}
```

**Resposta de Sucesso (201):**
```json
{
  "id": 124,
  "email": "usuario@exemplo.com",
  "name": "Nome Completo",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "phone": "11999999999",
  "cpf": "123.456.789-09"
}
```

**Respostas de Erro (400):**
```json
"Email já cadastrado!"
"CPF inválido!"
"Dados inválidos"
```

---

### **GET /api/auth/validate**
**Descrição**: Validar token JWT e obter dados do usuário

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta de Sucesso (200):**
```json
{
  "id": 123,
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "phone": "11999999999",
  "cpf": "123.456.789-09"
}
```

**Resposta de Erro (401):**
```json
"Token inválido ou expirado"
```

---

### **POST /api/auth/logout**
**Descrição**: Logout do usuário

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

## 🛍️ **2. Endpoints de Produtos**

### **GET /api/produtos/novidades**
**Descrição**: Buscar produtos em destaque (novidades)

**Headers (opcional se autenticado):**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": 1,
    "name": "Empadinha de Brigadeiro",
    "price": "R$ 5,00",
    "imageUrl": "https://cloudinary.com/empadinha-brigadeiro.jpg",
    "description": "feita com cacau.",
    "category": "doce",
    "available": true,
    "createdAt": "2024-01-15T10:30:00"
  },
  {
    "id": 2,
    "name": "Empadinha de Camarão",
    "price": "R$ 5,00",
    "imageUrl": "https://cloudinary.com/empadinha-camarao.jpg",
    "description": "feita com camarão rose.",
    "category": "salgado",
    "available": true,
    "createdAt": "2024-01-15T10:30:00"
  }
]
```

---

## 🔧 **3. Configurações de CORS**

O backend está configurado para aceitar requisições de:
- `http://localhost:3000` (desenvolvimento)
- `https://donaempadinha.netlify.app` (produção)

**Headers automáticos:**
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## 📝 **4. Validações Implementadas**

### **Validação de CPF**
- ✅ Formato: Aceita com ou sem formatação (12345678909 ou 123.456.789-09)
- ✅ Algoritmo: Validação matemática completa
- ✅ Unicidade: Não permite CPFs duplicados
- ✅ Armazenamento: Sempre salvo sem formatação no banco
- ✅ Resposta: Sempre formatado (123.456.789-09)

### **Validação de Email**
- ✅ Formato: Validação de formato de email
- ✅ Unicidade: Não permite emails duplicados
- ✅ Usado como username: Email é usado como username internamente

### **Validação de Senha**
- ✅ Obrigatória: Campo obrigatório
- ✅ Criptografia: Senha é criptografada com BCrypt

---

## 🚨 **5. Tratamento de Erros**

### **Códigos de Status HTTP**
| Código | Significado | Exemplo |
|---|---|---|
| **200** | Sucesso | Login/validação bem-sucedidos |
| **201** | Criado | Registro bem-sucedido |
| **400** | Dados inválidos | CPF inválido, email duplicado |
| **401** | Não autorizado | Token inválido, credenciais incorretas |
| **404** | Não encontrado | Produto não encontrado |
| **500** | Erro interno | Erro no servidor |

### **Estrutura de Erro**
```json
{
  "message": "Mensagem de erro específica"
}
```

**Exemplos de mensagens:**
- `"Email já cadastrado!"`
- `"CPF inválido!"`
- `"Credenciais inválidas"`
- `"Token inválido ou expirado"`

---

## 🔑 **6. Gerenciamento de Token JWT**

### **Características do Token**
- ✅ **Algoritmo**: HS256
- ✅ **Expiração**: 24 horas (86400000 ms)
- ✅ **Claims**: email, roles, exp
- ✅ **Formato**: Bearer Token

### **Como Usar**
```javascript
// Armazenar token após login
localStorage.setItem('token', response.token);

// Usar token nas requisições
const token = localStorage.getItem('token');
fetch('/api/auth/validate', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### **Validação de Token**
```javascript
// Verificar se token é válido
const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const response = await fetch('/api/auth/validate', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
```

---

## 📊 **7. Estrutura de Dados**

### **Usuário/Cliente**
```typescript
interface User {
  id: number;
  email: string;
  name: string;
  token: string;
  phone?: string;
  cpf?: string;
}
```

### **Produto**
```typescript
interface Product {
  id: number;
  name: string;
  price: string; // Formato: "R$ 5,00"
  imageUrl: string;
  description: string;
  category: "doce" | "salgado";
  available: boolean;
  createdAt: string; // ISO 8601
}
```

---

## 🧪 **8. Exemplos de Uso**

### **Login**
```javascript
const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const user = await response.json();
      localStorage.setItem('token', user.token);
      return user;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};
```

### **Registro**
```javascript
const register = async (userData) => {
  try {
    const response = await fetch('/api/auth/criar-login-cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (response.ok) {
      const user = await response.json();
      localStorage.setItem('token', user.token);
      return user;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error('Erro no registro:', error);
    throw error;
  }
};
```

### **Buscar Produtos**
```javascript
const getProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch('/api/produtos/novidades', {
      headers
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Erro ao buscar produtos');
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};
```

---

## ⚡ **9. Checklist de Integração**

### **Autenticação**
- [ ] Implementar login com email/senha
- [ ] Implementar registro de cliente
- [ ] Implementar validação de token
- [ ] Implementar logout
- [ ] Armazenar token no localStorage
- [ ] Interceptar requisições para adicionar Authorization header

### **Produtos**
- [ ] Buscar produtos em destaque
- [ ] Exibir preços formatados
- [ ] Categorizar produtos (doce/salgado)
- [ ] Tratar imagens do Cloudinary

### **Validações**
- [ ] Validar CPF no frontend (opcional, backend já valida)
- [ ] Validar email no frontend
- [ ] Validar campos obrigatórios

### **Tratamento de Erros**
- [ ] Tratar erros de autenticação (401)
- [ ] Tratar erros de validação (400)
- [ ] Tratar erros de servidor (500)
- [ ] Exibir mensagens de erro amigáveis

### **UX/UI**
- [ ] Loading states para requisições
- [ ] Feedback visual para sucesso/erro
- [ ] Redirecionamento após login/registro
- [ ] Proteção de rotas autenticadas

---

## 🚀 **10. Próximos Passos**

1. **Testar integração** com o backend atualizado
2. **Implementar** os endpoints no frontend
3. **Configurar** interceptors para token JWT
4. **Testar** fluxo completo de autenticação
5. **Testar** busca de produtos
6. **Deploy** da aplicação integrada

---

## 📞 **11. Suporte**

Se houver dúvidas ou problemas na integração:

1. **Verificar** se o backend está rodando na porta 8080
2. **Verificar** se as URLs estão corretas
3. **Verificar** se os headers estão sendo enviados
4. **Verificar** se o CORS está configurado
5. **Consultar** os logs do backend para erros detalhados

---

*Este guia garante uma integração perfeita entre frontend e backend, com todas as funcionalidades necessárias para o sistema Dona Empadinha.*
