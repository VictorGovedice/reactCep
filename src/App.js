import React from 'react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum CEP');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
        setCep(response.data);
        setInput('');
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar');
        setInput('');
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="container">
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        {cep.complemento !== "" ? (
          <span> Complemento: {cep.complemento}</span>
        ): <span>Não tem complemento</span>}
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        <span>Dados IBGE: {cep.ibge}</span>
        <span>Gia: {cep.gia}</span>
        <span>DDD: {cep.ddd}</span>
        <span>Siafi: {cep.siafi}</span>
      </main>
    )}


      <main className="mainpad">
        <h4>Desenvolvido por Victor Govedice</h4>
      </main>
    </div>
  );
}

export default App;
