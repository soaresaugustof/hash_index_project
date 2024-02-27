import './App.css';
import React, { useState } from 'react';
import Formulario from './components/Form';
import Dashboard from './components/Dasboard';

function App() {

  const [result, setResult] = useState([]);

  const handleSubmit = (quantity) => {
    //Requisição para o backend
    //Exemplo:
    /**
     * const handleSubmit = (quantidade) => {
      fetchResultados(quantidade)
      .then((data) => setResultados(data))
      .catch((error) => console.error('Erro ao obter resultados:', error));
  };
     */
  }

  return (
    <div>
      <h1>Formulário e Dashboard</h1>
      <Form />
      <Dashboard />
    </div>
  );
}

export default App;
