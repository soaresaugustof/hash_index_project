import './App.css';
import React, { useState } from 'react';
import Dashboard from './components/Dasboard';
import useSWR from 'swr';

const fetcher = (url, quantidade) => fetch(`${url}?quantidade=${quantidade}`).then((res) => res.json());

function App() {
  const [quantidade, setQuantidade] = useState(10);
  const [chave, setChave] = useState('');
  const { data: resultados, error } = useSWR(['URL_DA_SUA_API', quantidade, chave], fetcher);

  //if (error) return <div>Erro ao buscar dados da API</div>;
  //if (!resultados) return <div>Carregando...</div>;

  //const [resultado, setResultado] = useState([]);

  const handleSubmit = (quantidade) => {
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
      <img src="./img/hashr.svg" alt="Logo" />
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <label>
          Quantidade de Registros:
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </label>
        <button type="submit">Buscar</button>
      </form>
      <Dashboard  resultados={resultados} />
    </div>
  );
}

export default App;
