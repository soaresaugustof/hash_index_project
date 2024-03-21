import './App.css';
import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dasboard';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url, quantidade) => fetch(`${url}?quantidade=${quantidade}`).then((res) => res.json());

function App() {
  const [quantidade, setQuantidade] = useState(10);
  const [tuplas, setTuplas] = useState(10);
  const [chave, setChave] = useState('');
  const [formState, setFormState] = useState(0);
  const [resultadoDaRequest, setResultadoDaRequest] = useState();
  const { data: resultados, error } = useSWR(['URL_DA_SUA_API', quantidade, chave, tuplas], fetcher);

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

  const fetchData = async () => {
    try {
      const response = await axios.post('url-do-backend', {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao fazer requisição: ', error);
    }
  };

  const onSubmit = async () => {
    let requestData = {}; 
  
    switch (formState) {
      case 1:
        requestData = { chave }; 
        break;
      case 2:
        requestData = { quantidade }; 
        break;
      case 3:
        requestData = { tuplas }; 
        break;
      default:
        return;
    } 
  
    try {
      const response = await axios.post('xxxxx', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setResultadoDaRequest(response.data)
    } catch (error) {
      console.error('Erro ao fazer requisição: ', error);
    }
  };

  const switchButtonClick = () => {
    //AQUI
    switch (formState) {
      case 1:
        return (
          <>
            <div>
              <p>Chave de busca:</p>
              <input type="text" value={chave} onChange={(e) => setChave(e.target.value)} />
            </div>
            <button type="button" onClick={() => { setFormState(0) }}>Voltar</button>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <p>Número de registros por página:</p>
              <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            </div>
            <button type="button" onClick={() => { setFormState(0) }}>Voltar</button>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <p>Número de tuplas para scan:</p>
              <input type="number" value={tuplas} onChange={(e) => setTuplas(e.target.value)} />
            </div>
            <button type="button" onClick={() => { setFormState(0) }}>Voltar</button>
          </>
        );
      case 0:
        return (
          <>
            <button onClick={() => { setFormState(1) }}>Chave de busca</button>
            <button onClick={() => { setFormState(2) }}>Número de registros por página</button>
            <button onClick={() => { setFormState(3) }}>Número de tuplas para scan</button>
          </>
        );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => { onSubmit() }}>
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
              {switchButtonClick()}
            </div>
            {formState !== 0 &&
              (<div className="searchArrange">
                <button type="submit">Pesquisar</button>
              </div>)
            }
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
