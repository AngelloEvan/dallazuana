import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Função para formatar CPF
  const formatCPF = (value) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara do CPF
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return numbers.replace(/(\d{3})(\d)/, '$1.$2');
    } else if (numbers.length <= 9) {
      return numbers.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    } else {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
    }
  };

  // Função para validar CPF
  const validateCPF = (cpf) => {
    // Remove pontos e traços
    const numbers = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (numbers.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(numbers[9]) !== firstDigit) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers[i]) * (11 - i);
    }
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(numbers[10]) === secondDigit;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formattedCPF = formatCPF(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedCPF
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    if (!formData.name.trim()) {
      setError('Por favor, digite seu nome.');
      return false;
    }
    if (!formData.cpf.trim()) {
      setError('Por favor, digite seu CPF.');
      return false;
    }
    if (!validateCPF(formData.cpf)) {
      setError('CPF inválido. Verifique os números digitados.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.email, formData.password, formData.name, formData.phone, formData.cpf);
      navigate('/'); // Redireciona para a página inicial após registro
    } catch (error) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <img src="/logoEscrito.png" alt="Dona Empadinha" className="register-logo" />
          <h1>Criar Conta</h1>
          <p>Junte-se à família Dona Empadinha!</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              placeholder="000.000.000-00"
              maxLength="14"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone (opcional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Digite a senha novamente"
            />
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Já tem uma conta? 
            <Link to="/login" className="login-link"> Fazer login</Link>
          </p>
          <Link to="/" className="back-link">← Voltar ao início</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
