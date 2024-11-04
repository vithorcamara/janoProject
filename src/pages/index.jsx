import { useState } from "react";
import axios from "axios";
import TextField from "../components/TextField";
import Response from "../components/Response";
import ButtonSystem from "../components/ButtonSystem";

export default function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [data, setData] = useState("");
  const [ipnao, setIpnao] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);

  const fetchQuestion = async () => {
    setError("");
    setResponse(""); // Limpa a resposta anterior
    setLoading(true);
    try {
      const res = await axios.post(`/gemini/question`, { question });
      setData(res.data);
      setResponse(res.data.response || "Resposta não encontrada."); // Atualiza a resposta atual
      setSend(true);
    } catch (error) {
      console.error(error);
      setError("Erro ao buscar a resposta. Tente novamente.");
      setSend(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchSend = async () => {
    setError("");
    try {
      const ttsResponse = await axios.post(`/nao/ask`, { response: data.response, robot_ip: ipnao });
      console.log(ttsResponse);
    } catch (error) {
      console.error(error);
      setError("Erro ao enviar a resposta. Tente novamente.");
    } finally {
      setLoading(false);
      setResponse(""); // Limpa a resposta após o envio
      setSend(false);
      setQuestion(""); // Limpa a pergunta
    }
  };

  const onChangeIP = (e) => {
    setIpnao(e.target.value);
  };

  const onChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const eraseField = () => {
    setSend(false);
    setQuestion("");
    setResponse("");
  };

  const onKeyDownQuestion = (e) => {
    if (e.which === 13) {
      fetchQuestion();
    } else if (e.which === 27) {
      eraseField();
    }
  };

  return (
    <section className="MenuPage">
      <h1 className="title">Escrever</h1>
      <section className="fields">
        <TextField 
          title="IP"
          name="input_ip"
          value={ipnao}
          onChangeField={onChangeIP}
          placeholder="Digite o IP"
        />
        <TextField 
          title="Pergunta"
          name="input_pergunta"
          value={question}
          onChangeField={onChangeQuestion}
          onKeyDownField={onKeyDownQuestion}
          placeholder="Digite a pergunta"
        />
      </section>
      {!send ? <ButtonSystem
        classname="button"
        value="Perguntar"
        fetchQuestion={fetchQuestion}
      /> :
      <ButtonSystem
        classname="button"
        value="Enviar"
        fetchQuestion={fetchSend}
      />
      }
      <Response
        response={response}
        loading={loading}
        error={error}
      />
    </section>
  );
}
