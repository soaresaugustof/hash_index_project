/* eslint-disable default-case */
import "./App.css";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dasboard";
import useSWR from "swr";
import axios from "axios";
import { IconSearch, IconArrowBack, IconKey, IconGridScan, IconAbc, IconBook, IconClockHour4, IconFileCheck, IconMoodSad } from '@tabler/icons-react';

// const fetcher = (url, quantidade) => fetch(`${url}?quantidade=${quantidade}`).then((res) => res.json());

function App() {
  const [quantidade, setQuantidade] = useState(10);
  const [pagina, setPagina] = useState(1);
  const [tuplas, setTuplas] = useState(10);
  const [chave, setChave] = useState("");
  const [formState, setFormState] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [dadosDoFill, setDadosDoFill] = useState();

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
  };

  const fetchData = async () => {
    try {
      const response1 = await axios.post(
        "http://localhost:5051/api/hash/book"
      );

      const response2 = await axios.post(
        "http://localhost:5051/api/hash/fill"
      );

      console.log("Response from /api/hash/book:", response1.data);
      console.log("Response from /api/hash/fill:", response2.data);
      setDadosDoFill(response2.data);
    } catch (error) {
      console.error("Erro ao fazer requisição: ", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let requestData = {};
      let response;

      switch (formState) {
        case 1:
          response = await axios.get(
            `http://localhost:5051/api/hash/${chave}`
          );
          break;
        case 2:
          requestData = { tuplas };
          response = await axios.get(
            `http://localhost:5051/api/hash/first/${pagina}/${tuplas}`
          );
          break;
        default:
          return;
      }

      console.log(response.data);
      setResultado(response.data);
    } catch (error) {
      console.error("Erro ao fazer requisição: ", error);
      setResultado("error");
    }
  };

  const switchButtonClick = () => {
    switch (formState) {
      case 1:
        return (
          <>
            <div>
              <p>Chave de busca:</p>
              <input
                type="text"
                value={chave}
                onChange={(e) => setChave(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setFormState(0);
              }}
            >
              <IconArrowBack />
            </button>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <p>Número de tuplas para scan:</p>
              <input
                type="number"
                value={tuplas}
                onChange={(e) => setTuplas(e.target.value)}
              />
            </div>
            <div>
              <p>Página:</p>
              <input
                type="number"
                value={pagina}
                onChange={(e) => setPagina(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setFormState(0);
              }}
            >
              <IconArrowBack />
            </button>
          </>
        );
      default:
        return (
          <>
            <button
              onClick={() => {
                setFormState(1);
              }}
            >
              <IconKey />
              Chave de busca
            </button>
            <button
              onClick={() => {
                setFormState(2);
              }}
            >
              <IconGridScan />
              Número de tuplas para scan
            </button>
          </>
        );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
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
            <div className="searchArrange">{switchButtonClick()}</div>
            {formState !== 0 && (
              <div className="searchArrange">
                <div class="button-container">
                  <button type="submit">
                    <IconSearch />
                    Pesquisar
                  </button>
                </div>
              </div>
            )}
          </section>
          <section className="infos">
            <>
              <p>Taxa de colisão:</p>
              <p>{dadosDoFill?.numeroColisoes}</p>
            </>
            <>
              <p>Taxa de overflow:</p>
              <p>
                {dadosDoFill?.numeroOverflows}
              </p>
            </>
            <>
              {/* <p>Estimativa de custo:</p> */}
              {/* <p>{dadosDoFill.</p> */}
            </>
          </section>
          <div className={`dashboard ${resultado ? 'show' : ''}`}>
            {resultado?.hasOwnProperty("page") ? (
              <div>
                <h2 style={{ margin: "-1rem 0rem 2rem 0rem" }}>Resultados</h2>
                <section>
                  {resultado !== "error" ? (
                    <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconFileCheck color="#D79B64" />
                        <p>{resultado?.description}</p>
                      </div>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr>
                            <th colSpan="5" style={{ border: "1px solid #000", padding: "8px", textAlign: "left" }}>Palavras</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultado?.xFirstTuples.map((word, index) => (
                            index % 5 === 0 ? (
                              <tr key={index}>
                                <td style={{ border: "1px solid #000", padding: "8px" }}>{word}</td>
                                {resultado?.xFirstTuples[index + 1] && (
                                  <td style={{ border: "1px solid #000", padding: "8px" }}>{resultado?.xFirstTuples[index + 1]}</td>
                                )}
                                {resultado?.xFirstTuples[index + 2] && (
                                  <td style={{ border: "1px solid #000", padding: "8px" }}>{resultado?.xFirstTuples[index + 2]}</td>
                                )}
                                {resultado?.xFirstTuples[index + 3] && (
                                  <td style={{ border: "1px solid #000", padding: "8px" }}>{resultado?.xFirstTuples[index + 3]}</td>
                                )}
                                {resultado?.xFirstTuples[index + 4] && (
                                  <td style={{ border: "1px solid #000", padding: "8px" }}>{resultado?.xFirstTuples[index + 4]}</td>
                                )}
                              </tr>
                            ) : null
                          ))}
                        </tbody>
                      </table>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconBook color="#D79B64" />
                        <p>Página: {resultado?.page}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconClockHour4 color="#D79B64" />
                        <p>Tempo: {resultado?.runtime}</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <IconMoodSad color="#D79B64" />
                      <p s>Registro não encontrado.</p>
                    </div>
                  )}
                </section>
              </div>
            ) :
              <div>
                <h2 style={{ margin: "-1rem 0rem 2rem 0rem" }}>Resultados</h2>
                <section>
                  {resultado !== "error" ? (
                    <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconFileCheck color="#D79B64" />
                        <p>{resultado?.message}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconAbc color="#D79B64" />
                        <p>Palavra: {resultado?.searchWord}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconBook color="#D79B64" />
                        <p>Página: {resultado?.wordPage}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconClockHour4 color="#D79B64" />
                        <p>Tempo: {resultado?.runtime}</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <IconMoodSad color="#D79B64" />
                      <p s>Registro não encontrado.</p>
                    </div>
                  )}
                </section>
              </div>
            }
          </div>
        </main>
      </form>
    </div>
  );
}

export default App;
