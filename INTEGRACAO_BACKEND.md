# Integração AuthContext com Backend

## ✅ Integração Implementada

O AuthContext foi atualizado para se comunicar com o backend real, substituindo as simulações por chamadas de API.

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
REACT_APP_API_URL=http://localhost:3001
```

### URLs da API
- **Login**: `POST /api/auth/login`
- **Registro**: `POST /api/auth/criar-login-cliente`
- **Validação**: `GET /api/auth/validate`
- **Logout**: `POST /api/auth/logout`

## 📡 Endpoints Implementados

### 1. Login (`POST /api/auth/login`)
**Payload enviado:**
```json
{
  "username": "email@exemplo.com",
  "password": "senha123"
}
```

**Resposta esperada:**
```json
{
  "id": 123,
  "username": "email@exemplo.com",
  "name": "Nome do Usuário",
  "token": "jwt_token_aqui",
  "phone": "11999999999",
  "cpf": "123.456.789-09"
}
```

### 2. Registro (`POST /api/auth/criar-login-cliente`)
**Payload enviado:**
```json
{
  "username": "email@exemplo.com",
  "password": "senha123",
  "nome": "Nome Completo",
  "telefone": "11999999999",
  "cpf": "123.456.789-09"
}
```

**Resposta esperada:**
```json
{
  "id": 123,
  "username": "email@exemplo.com",
  "name": "Nome Completo",
  "token": "jwt_token_aqui",
  "phone": "11999999999",
  "cpf": "123.456.789-09"
}
```

### 3. Validação de Token (`GET /api/auth/validate`)
**Headers:**
```
Authorization: Bearer jwt_token_aqui
```

### 4. Logout (`POST /api/auth/logout`)
**Headers:**
```
Authorization: Bearer jwt_token_aqui
```

## 🔄 Funcionalidades Implementadas

### Login
- ✅ Chamada POST para `/api/auth/login`
- ✅ Envia `username` (email) e `password`
- ✅ Salva dados do usuário e token no localStorage
- ✅ Tratamento de erros com mensagens específicas

### Registro
- ✅ Chamada POST para `/api/auth/criar-login-cliente`
- ✅ Envia todos os dados do formulário
- ✅ Mapeamento correto dos campos (nome, telefone, cpf)
- ✅ Salva dados do usuário e token no localStorage

### Validação de Token
- ✅ Verifica token ao inicializar a aplicação
- ✅ Valida token com o backend
- ✅ Remove dados se token for inválido
- ✅ Logout automático em caso de token expirado

### Logout
- ✅ Notifica backend sobre logout
- ✅ Remove dados locais
- ✅ Funciona mesmo se backend estiver offline

## 🛡️ Segurança

### Gerenciamento de Token
- Token JWT salvo no localStorage
- Validação automática ao carregar a página
- Logout automático se token expirar
- Headers de autorização em todas as requisições

### Tratamento de Erros
- Mensagens de erro específicas do backend
- Fallback para erros de rede
- Logout automático em caso de token inválido
- Console logs para debugging

## 📱 Como Usar

### 1. Configurar Backend
Certifique-se de que o backend está rodando na URL configurada.

### 2. Testar Login
```javascript
const { login } = useAuth();
try {
  await login('email@exemplo.com', 'senha123');
  // Usuário logado com sucesso
} catch (error) {
  // Tratar erro de login
}
```

### 3. Testar Registro
```javascript
const { register } = useAuth();
try {
  await register('email@exemplo.com', 'senha123', 'Nome Completo', '11999999999', '123.456.789-09');
  // Conta criada com sucesso
} catch (error) {
  // Tratar erro de registro
}
```

### 4. Verificar Autenticação
```javascript
const { isAuthenticated, user } = useAuth();
if (isAuthenticated()) {
  console.log('Usuário logado:', user.name);
}
```

## 🔧 Ajustes Necessários

### Backend
1. **Implementar endpoints** conforme especificado
2. **Retornar token JWT** nas respostas de login/registro
3. **Validar CPF** no backend
4. **Implementar logout** para invalidar tokens

### Frontend
1. **Configurar URL da API** no arquivo `.env`
2. **Testar integração** com backend real
3. **Ajustar mapeamento de campos** se necessário

## 🚀 Próximos Passos

1. **Testar com backend real**
2. **Implementar refresh token** se necessário
3. **Adicionar interceptors** para requisições
4. **Implementar timeout** para requisições
5. **Adicionar loading states** mais granulares

---

*Integração completa e pronta para uso com backend real.*
