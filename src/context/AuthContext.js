import React, { createContext, useState, useContext } from 'react'; // Importa React e hooks de criação de contexto, estado e utilização de contexto

const AuthContext = createContext(); // Cria um novo contexto de autenticação


export const AuthProvider = ({ children }) => { // Componente provedor de autenticação
  const [user, setUser] = useState(''); // Estado do usuário inicializado como null

  const login = async (email, password) => { // Função de login assíncrona
    
    try {
      const response = await fetch('https://api-task-manager-ten.vercel.app/login', { // Envia uma solicitação POST para o endpoint de login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o cabeçalho da solicitação como JSON
        },
        body: JSON.stringify({ email, password }), // Converte email e senha para JSON
      });
      const data = await response.json(); // Converte a resposta para JSON
      console.log('Login Response:', data);

      if (response.ok) { // Verifica se a resposta foi bem-sucedida
        setUser({ name: data.name, email: data.email }); // Define o estado do usuário com o email
        console.log(data.name);
        localStorage.setItem('token', data.token); // Armazena o token no localStorage
        console.log('Token:', data.token);
        return true; // Retorna verdadeiro indicando sucesso
      } else {
        alert(data.message); // Exibe mensagem de erro
        return false; // Retorna falso indicando falha
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error); // Loga erro no console
      return false; // Retorna falso indicando falha
    }
  };

  const register = async (name, email, password) => { // Função de registro assíncrona
    try {
      const response = await fetch('https://api-task-manager-ten.vercel.app/register', { // Envia uma solicitação POST para o endpoint de registro
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o cabeçalho da solicitação como JSON
        },
        body: JSON.stringify({ name, email, password }), // Converte nome, email e senha para JSON
      });
      const data = await response.json(); // Converte a resposta para JSON

      if (response.ok) { // Verifica se a resposta foi bem-sucedida
        setUser({ name, email }); // Define o estado do usuário com nome e email
        return true; // Retorna verdadeiro indicando sucesso
      } else {
        alert(data.message); // Exibe mensagem de erro
        return false; // Retorna falso indicando falha
      }
    } catch (error) {
      console.error('Erro ao registrar:', error); // Loga erro no console
      return false; // Retorna falso indicando falha
    }
  };

  const logout = () => {
    setUser(null); // Reseta o estado do usuário para null
    localStorage.removeItem('token'); // Remove o token do localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}> 
      {children} {/* Prove os valores do contexto de autenticação para os componentes filhos */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Hook para utilizar o contexto de autenticação
