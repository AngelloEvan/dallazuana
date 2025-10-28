# Correção: Porta 8080 vs 5000

## Problema Identificado

O frontend estava tentando fazer login na porta **8080** (`http://localhost:8080`), mas:
- Backend AWS usa porta **5000**
- Em produção, deveria usar o proxy `/api` do Netlify

## Correção Feita

### Arquivo: `src/context/AuthContext.js`

**Antes:**
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
```

**Depois:**
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080');
```

## Como Funciona Agora

### Em Produção (Netlify)
- `API_BASE_URL` = `''` (vazio)
- URLs ficam: `/api/auth/login`, `/api/auth/validate`, etc.
- Netlify intercepta `/api/*` e redireciona para o backend EB
- ✅ Funciona corretamente

### Em Desenvolvimento
- `API_BASE_URL` = `http://localhost:8080`
- URLs ficam: `http://localhost:8080/api/auth/login`
- ⚠️ **ATENÇÃO**: Backend local precisa rodar na porta 8080

## Opções para Desenvolvimento

### Opção 1: Backend na porta 8080 (padrão)
```bash
cd backend
mvn spring-boot:run
# Backend rodando em http://localhost:8080
```

### Opção 2: Criar arquivo .env para usar porta 5000
Criar arquivo `.env` na raiz do frontend:
```bash
REACT_APP_API_URL=http://localhost:5000
```
Então o frontend vai usar `http://localhost:5000/api/...`

## Arquivo do apiClient

O `src/services/apiClient.js` já estava correto:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/api');
```

## Resumo

| Ambiente | URL usada | Como funciona |
|----------|-----------|----------------|
| **Produção (Netlify)** | `/api` | Proxy do Netlify redireciona para EB |
| **Produção (EB)** | `/api` | Nginx faz proxy para backend na porta 5000 |
| **Dev (8080)** | `http://localhost:8080/api` | Backend local na porta 8080 |
| **Dev (5000)** | `http://localhost:5000/api` | Backend local na porta 5000 (via .env) |

## Próximos Passos

1. ✅ Mudança feita no `AuthContext.js`
2. Commitar a mudança
3. Build e deploy no Netlify
4. Testar login em produção
