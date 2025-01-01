import React from 'react'; // Importa a biblioteca React
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // Importa componentes para criação de rotas

import { AuthProvider } from './context/AuthContext'; // Importa o contexto de autenticação
import Home from './components/Home'; // Importa o componente Home
import Header from './components/Header'; // Importa o componente Header
import Login from './components/Login'; // Importa o componente Login
import Register from './components/Register'; // Importa o componente Register
import Tasks from './components/Tasks'; // Importa o componente Tasks


const App = () => { 
  return (
    <AuthProvider> {/* Provedor de autenticação */}
      <Router> {/* Componente de roteamento principal */}
        <div className="App">
          <Header /> {/* Renderiza o componente Header */}
          
          <Routes> {/* Define as rotas */}
            <Route path="/" element={<Home />} /> {/* Rota para o componente Home */}
            <Route path="/login" element={<Login />} /> {/* Rota para o componente Login */}
            <Route path="/register" element={<Register />} /> {/* Rota para o componente Register */}
            <Route path='/tasks' element={<Tasks />} /> {/* Rota para o componente Tasks */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; // Exporta o componente App como padrão
