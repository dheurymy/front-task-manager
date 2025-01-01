import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/tasks.css';

const Tasks = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState(''); // Estado para a categoria de filtro
  const [filterStatus, setFilterStatus] = useState(''); // Estado para o status de filtro
  const [sortOrder, setSortOrder] = useState('A-Z'); // Estado para a direção de ordenação

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api-task-manager-ten.vercel.app/tasks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data);
        } else {
          console.error(data.message);
          if (response.status === 401) {
            logout();
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTaskCategory === '') {
      alert('Por favor, selecione uma categoria para a tarefa.');
      return;
    }
    try {
      const response = await fetch('https://api-task-manager-ten.vercel.app/addtask', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newTaskText, category: newTaskCategory })
      });
      const data = await response.json();
      if (response.ok) {
        setTasks([...tasks, data]);
        setNewTaskText('');
        setNewTaskCategory('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      const response = await fetch(`https://api-task-manager-ten.vercel.app/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isCompleted: true }) // Atualiza isCompleted para true
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(tasks.map(task => task._id === id ? data : task)); // Atualiza a tarefa no estado
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro ao completar a tarefa:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`https://api-task-manager-ten.vercel.app/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== id)); // Remove a tarefa do estado
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = filterCategory ? task.category === filterCategory : true;
    const matchesStatus = filterStatus ? (filterStatus === 'Concluída' ? task.isCompleted : !task.isCompleted) : true;
    return matchesCategory && matchesStatus;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return a.text.localeCompare(b.text);
    } else {
      return b.text.localeCompare(a.text);
    }
  });

  return (
    <div className="tasks">
      <div className='tasks-header'>
        <h2>Tarefas:</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      

      <form onSubmit={handleAddTask} className='tasks-add'>
        <input
          type="text"
          placeholder="Tarefa:"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          required
        />
        <div  className='tasks-add-buttons'>
          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
            required
          >
            <option value="">Categoria:</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Estudos">Estudos</option>
            <option value="Pessoal">Pessoal</option>
          </select>
          <button type="submit">Criar:</button>
        </div>
      </form>
      
      <div className='tasks-filters'>
        <div className='tasks-filters-category'>
          <label htmlFor="filterCategory">Categoria:</label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
          
            <option value="">Todas</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Estudo">Estudos</option>
            <option value="Pessoal">Pessoal</option>
          </select>
        </div>
        
        <div className='tasks-filters-status'>
          <label htmlFor="filterStatus">Status:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Concluída">Concluída</option>
            <option value="Pendente">Pendente</option>
          </select>
        </div>

        <div className='tasks-filters-sort'>
          <label htmlFor="sortOrder">Ordenação:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
      </div>

      <div className='tasks-list'>
        {sortedTasks.map(task => (
          <div key={task._id} className={`task ${task.isCompleted ? 'finished' : ''}`}>
            <h3>{task.text}</h3>
            <div className='task-details'>
              <div className={`task-tag ${task.category}`}>
                <span className='dot'></span>
                {task.category}
              </div>
              <div className={`task-tag ${task.isCompleted ? 'concluida' : 'pendente'}`}><span className='dot'></span>{task.isCompleted ? 'Concluída' : 'Pendente'}</div>
              {!task.isCompleted && (
                <button className='complete' onClick={() => handleCompleteTask(task._id)}>Finalizar</button>
              )}
              <button className='delete' onClick={() => handleDeleteTask(task._id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
