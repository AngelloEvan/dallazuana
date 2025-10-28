# Solução: Porta 5000 no Desenvolvimento

## Problema
O frontend estava tentando acessar `localhost:8080` mas o backend está na porta `5000`.

## Solução Implementada

### 1. Arquivo `.env` criado
```
REACT_APP_API_URL=http://localhost:5000
```

### 2. Mudança no AuthContext.js
Agora usa a mesma lógica do apiClient:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080');
```

## Como Usar

### Para usar porta 5000 (backend AWS):
1. ✅ Arquivo `.env` já criado com `REACT_APP_API_URL=http://localhost:5000`
2. Reinicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

### Para usar porta 8080 (backend local):
1. Delete ou comente a linha no `.env`:
   ```
   # REACT_APP_API_URL=http://localhost:5000
   ```
2. Reinicie o servidor de desenvolvimento

### Para produção (Netlify):
- Arquivo `.env` NÃO é deployado
- Usa `/api` que passa pelo proxy do Netlify
- Funciona automaticamente ✅

## Próximos Passos

1. **Parar** o servidor atual (Ctrl+C)
2. **Reiniciar**: `npm start`
3. Tentar login novamente

## Verificações

Depois de reiniciar, as chamadas serão:
- ❌ `http://localhost:8080/api/auth/login`
- ✅ `http://localhost:5000/api/auth/login`

## Importante

O arquivo `.env` não deve ser commitado no git (já está no `.gitignore`).
Cada desenvolvedor pode ter sua própria configuração.
