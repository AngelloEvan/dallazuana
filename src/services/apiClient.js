import axios from 'axios';

// A URL base do seu backend Spring Boot (porta 8080)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// 1. Cria a instância do Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor para Gerenciamento de JWT (Middleware de Requisição)
// Esta função é chamada antes de CADA requisição
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    
    // Se o token existir, ele é adicionado ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 3. Funções de Autenticação (NÃO USAM O INTERCEPTOR, pois são a fonte do token)
// É mais limpo ter essas funções no AuthContext, mas elas fazem a chamada
export const login = (email, password) => {
    // Retorna a promessa de login para ser usada no AuthContext
    return apiClient.post('/auth/login', { email, password });
};

export const registerClient = (formData) => {
    // Retorna a promessa de registro para ser usada no AuthContext
    return apiClient.post('/auth/criar-login-cliente', formData);
};


// 4. Exporta a instância principal para uso em componentes protegidos (ex: ProductList)
export default apiClient;