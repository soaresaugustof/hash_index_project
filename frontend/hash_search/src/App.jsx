import './App.css';
import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dasboard';
import useSWR from 'swr';
import axios,{ AxiosRequestConfig } from 'axios';

const fetcher = (url, quantidade) => fetch(`${url}?quantidade=${quantidade}`).then((res) => res.json());

function App() {
  const [quantidade, setQuantidade] = useState(10);
  const [tuplas, setTuplas] = useState(10);
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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('url-do-backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erro ao fazer requisição: ', error);
        }
    };

    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <header>
            <nav>
                <h1>#ASH READER</h1>
            </nav>
        </header>
        <main className="main">
            <div className="title">
                <h2>Campos de busca</h2>
            </div>
            <section className="pesquisa">
                <div className="searchArrange">
                    <div>
                        <p>Chave de busca:</p>
                        <input type="text" value={chave} onChange={(e) => setChave(e.target.value)}/>
                    </div>
                    <div>
                        <p>Número de registros por página:</p>
                        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                    </div>
                    <div>
                        <p>Número de tuplas para scan:</p>
                        <input type="number" value={tuplas} onChange={(e) => setTuplas(e.target.value)} />
                    </div>
                </div>
                <div className="searchArrange">
                    <button type="submit">Pesquisar</button>
                </div>
            </section>
            <section className="infos">
                <p>Taxa de colisão:</p>
                <p>Taxa de overflow:</p>
                <p>Estimativa de custo:</p>
            </section>
            <div className="resultLabel">
                <h2>Tela de resultados</h2>
            </div>
            <section className="dashboard">
                <Dashboard resultados={resultados} />
            </section>
        </main>
      </form>
    </div>
  );
}

export default App;
