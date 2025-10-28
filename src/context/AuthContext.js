import React, { createContext, useState, useContext, useEffect } from 'react';

// URL base da API - usa a mesma lógica do apiClient
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080');

// 1. Cria o Context de Autenticação
const AuthContext = createContext();

// 2. Cria o Provider (Componente que irá fornecer o estado de autenticação)
export const AuthProvider = ({ children }) => {
  // Estado para armazenar informações do usuário
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se há dados salvos no localStorage ao carregar a página
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('donaEmpadinha_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        
        // Se houver um token, verifica se ainda é válido
        if (userData.token) {
          try {
            await validateToken(userData.token);
            setUser(userData);
          } catch (error) {
            // Token inválido, remove dados salvos
            localStorage.removeItem('donaEmpadinha_user');
            console.log('Token expirado, usuário deslogado');
          }
        } else {
          setUser(userData);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Função para validar token com o backend
  const validateToken = async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    return response.json();
  };

  // Função para fazer login
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // Chamada para o backend real
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, 
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const userData = await response.json();
      
      // Salva dados do usuário no estado e localStorage
      setUser(userData);
      localStorage.setItem('donaEmpadinha_user', JSON.stringify(userData));
      
      // Salva também o token separadamente para o interceptor do apiClient
      if (userData.token) {
        localStorage.setItem('jwtToken', userData.token);
      }
      
      return userData;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para registrar novo usuário
  const register = async (email, password, name, phone = '', cpf = '') => {
    setIsLoading(true);
    
    try {
      // Chamada para o backend real
      const response = await fetch(`${API_BASE_URL}/api/auth/criar-login-cliente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, 
          password: password,
          nome: name,
          telefone: phone,
          cpf: cpf
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar conta');
      }

      const userData = await response.json();
      
      // Salva dados do usuário no estado e localStorage
      setUser(userData);
      localStorage.setItem('donaEmpadinha_user', JSON.stringify(userData));
      
      // Salva também o token separadamente para o interceptor do apiClient
      if (userData.token) {
        localStorage.setItem('jwtToken', userData.token);
      }
      
      return userData;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      // Se houver token, notifica o backend sobre o logout
      const savedUser = localStorage.getItem('donaEmpadinha_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData.token) {
          await fetch(`${API_BASE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userData.token}`,
              'Content-Type': 'application/json',
            }
          });
        }
      }
    } catch (error) {
      console.error('Erro ao fazer logout no backend:', error);
      // Continua com o logout local mesmo se der erro no backend
    } finally {
      // Sempre limpa os dados locais
      setUser(null);
      localStorage.removeItem('donaEmpadinha_user');
      localStorage.removeItem('jwtToken'); // Remove também o token JWT
    }
  };

  // Função para atualizar dados do usuário
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('donaEmpadinha_user', JSON.stringify(updatedUser));
  };

  // Verifica se o usuário está autenticado
  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. Cria um Custom Hook para facilitar o consumo do Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
