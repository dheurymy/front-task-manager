import React, { useState } from 'react'; // Importa React e o hook useState
import { Link, useNavigate } from 'react-router-dom'; // Importa componentes de roteamento
import { useAuth } from '../context/AuthContext'; // Importa o hook useAuth do contexto de autenticação

import '../assets/styles/login.css'; // Importa o arquivo de estilos CSS para a página de login

const Login = () => { // Componente funcional Login
  const [email, setEmail] = useState(''); // Estado para o email inicializado como string vazia
  const [password, setPassword] = useState(''); // Estado para a senha inicializado como string vazia
  const { login } = useAuth(); // Utiliza o hook useAuth para acessar a função de login do contexto de autenticação
  const navigate = useNavigate(); // Hook de navegação para redirecionar o usuário

  const handleSubmit = async (e) => { // Função de envio do formulário
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const response = await fetch('https://api-task-manager-ten.vercel.app/login', { // Envia uma solicitação POST para o endpoint de login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o cabeçalho da solicitação como JSON
        },
        body: JSON.stringify({ email, password }), // Converte email e senha para JSON
      });
      const data = await response.json(); // Converte a resposta para JSON

      if (response.ok) { // Verifica se a resposta foi bem-sucedida
        localStorage.setItem('token', data.token); // Armazena o token no localStorage
        console.log('Token:', data.token); // Loga o token no console
        alert("Login efetuado com sucesso!"); // Exibe mensagem de sucesso
        navigate('/tasks'); // Redireciona para a página de tarefas
      } else {
        alert(data.message); // Exibe mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error); // Loga erro no console
    }
  };

  return (
    <div className='login'> {/* Div principal da página de login */}
      <h2>Login</h2>
      <p>Insira seus dados para acessar <br></br> sua conta do Lista de Tarefas</p>
      <form onSubmit={handleSubmit}> {/* Formulário de login */}
        <input
          type="email"
          placeholder="E-mail:"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
          required
        />
        <input
          type="password"
          placeholder="Senha:"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          required
          autoComplete='on'
        />
        <button type="submit">Login</button> {/* Botão de envio do formulário */}
      </form>
      <p>Não tem uma conta? <Link to="/register"><button>Cadastrar</button></Link></p> {/* Link para a página de cadastro */}
    </div>
  );
}

export default Login; // Exporta o componente Login como padrão
