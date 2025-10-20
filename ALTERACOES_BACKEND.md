# Alterações Necessárias no Backend

## 📋 Resumo das Mudanças Necessárias

Com base nas implementações do frontend, o backend precisa ser ajustado para funcionar corretamente com as novas funcionalidades.

## 🔧 1. Endpoints de Autenticação

### **POST /api/auth/login**
**Payload esperado pelo frontend:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta esperada:**
```json
{
  "id": 123,
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "token": "jwt_token_aqui",
  "phone": "11999999999",
  "cpf": "123.456.789-09"
}
```

### **POST /api/auth/criar-login-cliente**
**Payload esperado pelo frontend:**
```json
{
  "email": "usuario@exemplo.com",
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
  "email": "usuario@exemplo.com",
  "name": "Nome Completo",
  "token": "jwt_token_aqui",
  "phone": "11999999999",
  "cpf": "123.456.789-09"
}
```

### **GET /api/auth/validate**
**Headers necessários:**
```
Authorization: Bearer jwt_token_aqui
```

**Resposta esperada:**
```json
{
  "valid": true,
  "user": {
    "id": 123,
    "email": "usuario@exemplo.com",
    "name": "Nome do Usuário"
  }
}
```

### **POST /api/auth/logout**
**Headers necessários:**
```
Authorization: Bearer jwt_token_aqui
```

**Resposta esperada:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

## 🔧 2. Endpoint de Produtos

### **GET /api/produtos/novidades**
**Headers necessários (se autenticado):**
```
Authorization: Bearer jwt_token_aqui
```

**Resposta esperada:**
```json
[
  {
    "id": 1,
    "name": "Empadinha de Brigadeiro",
    "price": "R$ 5,00",
    "imageUrl": "url_da_imagem",
    "description": "feita com cacau.",
    "category": "doce"
  },
  {
    "id": 2,
    "name": "Empadinha de Camarão",
    "price": "R$ 5,00",
    "imageUrl": "url_da_imagem",
    "description": "feita com camarão rose.",
    "category": "salgado"
  }
]
```

## 🔧 3. Alterações Específicas Necessárias

### **A. Mudança de Username para Email**
- ✅ **Login**: Aceitar `email` ao invés de `username`
- ✅ **Registro**: Aceitar `email` ao invés de `username`
- ✅ **Validação**: Validar formato de email
- ✅ **Banco de Dados**: Garantir que campo email seja único

### **B. Geração de Token JWT**
- ✅ **Login**: Retornar token JWT na resposta
- ✅ **Registro**: Retornar token JWT na resposta
- ✅ **Validação**: Endpoint para verificar token
- ✅ **Expiração**: Configurar tempo de expiração do token

### **C. Estrutura de Resposta Padronizada**
- ✅ **Campos obrigatórios**: `id`, `email`, `name`, `token`
- ✅ **Campos opcionais**: `phone`, `cpf`
- ✅ **Consistência**: Mesma estrutura para login e registro

### **D. Validação de CPF**
- ✅ **Formato**: Validar formato do CPF
- ✅ **Algoritmo**: Implementar validação matemática
- ✅ **Unicidade**: Garantir que CPF seja único no sistema

## 🔧 4. Configurações de CORS

### **Headers Necessários**
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## 🔧 5. Tratamento de Erros

### **Códigos de Status HTTP**
- ✅ **200**: Sucesso
- ✅ **400**: Dados inválidos
- ✅ **401**: Não autorizado
- ✅ **404**: Não encontrado
- ✅ **500**: Erro interno do servidor

### **Estrutura de Erro**
```json
{
  "message": "Mensagem de erro específica",
  "code": "ERROR_CODE",
  "details": "Detalhes adicionais (opcional)"
}
```

## 🔧 6. Exemplos de Implementação

### **Controller de Autenticação (Spring Boot)**
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Validar email e senha
        // Gerar token JWT
        // Retornar dados do usuário + token
    }
    
    @PostMapping("/criar-login-cliente")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Validar dados
        // Criar usuário
        // Gerar token JWT
        // Retornar dados do usuário + token
    }
    
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(HttpServletRequest request) {
        // Extrair token do header
        // Validar token
        // Retornar dados do usuário
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Invalidar token (opcional)
        // Retornar confirmação
    }
}
```

### **Controller de Produtos**
```java
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
    
    @GetMapping("/novidades")
    public ResponseEntity<List<ProdutoDTO>> getNovidades() {
        // Buscar produtos em destaque
        // Retornar lista de produtos
    }
}
```

## 🔧 7. Banco de Dados

### **Tabela de Usuários**
```sql
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Tabela de Produtos**
```sql
CREATE TABLE produtos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    imagem_url VARCHAR(500),
    descricao TEXT,
    categoria VARCHAR(100),
    destaque BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚀 8. Próximos Passos

1. **Implementar endpoints** conforme especificado
2. **Configurar JWT** para autenticação
3. **Implementar validação** de CPF e email
4. **Configurar CORS** para permitir requisições do frontend
5. **Testar integração** com frontend
6. **Implementar tratamento de erros** padronizado

## 📝 9. Checklist de Implementação

- [ ] Endpoint `/api/auth/login` com email
- [ ] Endpoint `/api/auth/criar-login-cliente` com todos os campos
- [ ] Endpoint `/api/auth/validate` para verificar token
- [ ] Endpoint `/api/auth/logout` para invalidar token
- [ ] Endpoint `/api/produtos/novidades` para produtos em destaque
- [ ] Configuração de CORS
- [ ] Geração e validação de JWT
- [ ] Validação de CPF
- [ ] Tratamento de erros padronizado
- [ ] Testes de integração

---

*Este documento serve como guia completo para implementar o backend compatível com o frontend atual.*

