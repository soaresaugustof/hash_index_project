/* eslint-disable default-case */
import "./App.css";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dasboard";
import useSWR from "swr";
import axios from "axios";
import { IconSearch, IconArrowBack, IconKey, IconGridScan, IconAbc, IconBook, IconClockHour4, IconFileCheck, IconMoodSad, IconSettings, IconListSearch } from '@tabler/icons-react';

function App() {
  const [chamadas, setChamadas] = useState(0);
  const [tuplas, setTuplas] = useState(10);
  const [chave, setChave] = useState("");
  const [formState, setFormState] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [dadosDoFill, setDadosDoFill] = useState();
  const [loadingFillData, setLoadingFillData] = useState();
  const [qtdRegs, setQtdRegs] = useState(100);

  const incrementarChamadas = () => {
    setChamadas(chamadas + 1)
  }

  const fetchData = () => {
    setLoadingFillData(true); // Set loading to true before fetching data
    axios.post(`http://localhost:5051/api/hash/book/${qtdRegs}`)
      .then(response1 => {
        return axios.post("http://localhost:5051/api/hash/fill");
      })
      .then(response2 => {
        setDadosDoFill(response2.data);
        setLoadingFillData(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error("Erro ao fazer requisição: ", error);
        setLoadingFillData(false); // Handle error case and set loading to false
      });
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
            `http://localhost:5051/api/hash/first/${tuplas}`
          );
          incrementarChamadas()
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
            <div className="searchArrange">
              <input
                type="number"
                value={qtdRegs}
                onChange={(e) => setQtdRegs(e.target.value)}
              />
              <button
                disabled={loadingFillData}
                style={{ background: loadingFillData ? 'lightgray' : '#D79B64' }}
                type="submit"
                onClick={() => fetchData()}
              >
                Carregar hash
              </button>
            </div>
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

          {
            loadingFillData ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <div className="loader" />
              </div>
            ) : dadosDoFill ? (
              <section className="infos" >
                <>
                  <p>Taxa de colisão:</p>
                  <p>{dadosDoFill.numeroColisoes}</p>
                </>
                <>
                  <p>Taxa de overflow:</p>
                  <p>{dadosDoFill.numeroOverflows}</p>
                </>
              </section>
            ) : null
          }

          <div className={`dashboard ${resultado ? 'show' : ''}`}>
            {resultado?.hasOwnProperty("costEtimate") ? (
              <div>
                <h2 style={{ margin: "-1rem 0rem 2rem 0rem" }}>Resultados</h2>
                <section>
                  {resultado !== "error" ? (
                    <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconSettings color="#D79B64" />
                        <p>Custo estimado: {resultado?.costEtimate}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconListSearch color="#D79B64" />
                        <p>Quantidade de tuplas pesquisadas: {resultado?.searchTuplesQuantity}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <IconClockHour4 color="#D79B64" />
                        <p>Tempo: {resultado?.runtime}</p>
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
