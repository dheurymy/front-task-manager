import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/home.css';

const Home = () => {
  return (
    <div className='home'>
        <p>Entre ou cadastre-se no Lista de Tarefas</p>
        <div className='buttons'>
        <Link to="/login"><button>Entrar</button></Link>
        <Link to="/register"><button>Cadastrar</button></Link>
            
        </div>     
    </div>
  )
}

export default Home
