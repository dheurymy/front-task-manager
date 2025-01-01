import React, { useState } from 'react'; // Importa React e o hook useState
import { Link, useNavigate } from 'react-router-dom'; // Importa componentes de roteamento
import { useAuth } from '../context/AuthContext'; // Importa o hook useAuth do contexto de autenticação

import '../assets/styles/register.css'; // Importa o arquivo de estilos CSS para a página de cadastro

const Register = () => { // Componente funcional Register
  const [name, setName] = useState(''); // Estado para o nome inicializado como string vazia
  const [email, setEmail] = useState(''); // Estado para o email inicializado como string vazia
  const [password, setPassword] = useState(''); // Estado para a senha inicializado como string vazia
  const { register } = useAuth(); // Utiliza o hook useAuth para acessar a função de registro do contexto de autenticação
  const navigate = useNavigate(); // Hook de navegação para redirecionar o usuário

  const handleSubmit = async (e) => { // Função de envio do formulário
    e.preventDefault(); // Previne o comportamento padrão do formulário
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
        alert("Usuário registrado com sucesso!"); // Exibe mensagem de sucesso
        navigate('/login'); // Redireciona para a página de login
      } else {
        alert(data.message); // Exibe mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao registrar:', error); // Loga erro no console
    }
  };

  return (
    <div className='register'> {/* Div principal da página de cadastro */}
      <h2>Cadastro</h2>
      <p>Insira seus dados para criar <br></br> uma conta no Lista de Tarefas</p>
      <form onSubmit={handleSubmit}> {/* Formulário de cadastro */}
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)} // Atualiza o estado do nome
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          required
        />
        <button type="submit">Cadastrar</button> {/* Botão de envio do formulário */}
      </form>
      <p>Já tem uma conta? <Link to="/login"><button>Entrar</button></Link></p> {/* Link para a página de login */}
    </div>
  );
};

export default Register; // Exporta o componente Register como padrão
