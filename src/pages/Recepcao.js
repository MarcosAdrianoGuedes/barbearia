import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './Recepcao.css';
import { useListaComandas, barbeiros, produtos } from './comandaUtils';

function Recepcao() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [barbeiro, setBarbeiro] = useState('');
  const [tipoCorte, setTipoCorte] = useState([]);
  const [erroAgendamento, setErroAgendamento] = useState('');
  const navigate = useNavigate();
  const [comandas, adicionarComanda, editarComanda] = useListaComandas();
  const location = useLocation();
  const [valorTotal, setValorTotal] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState('Dinheiro');

  useEffect(() => {
    setErroAgendamento('');
    if (location.state && location.state.comanda) {
      const { nome, telefone, barbeiro, tipoCorte, formaPagamento } = location.state.comanda;
      setNome(nome);
      setTelefone(telefone);
      setBarbeiro(barbeiro);
      setTipoCorte(tipoCorte);
      setFormaPagamento(formaPagamento);
    }
  }, [location.state]);

  useEffect(() => {
    const novoValorTotal = calcularValorComanda(tipoCorte);
    setValorTotal(novoValorTotal);
  }, [tipoCorte]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nome && telefone && barbeiro && tipoCorte.length > 0) {
      const horario = new Date().toLocaleTimeString();

      const barbeiroJaAgendado = comandas.some(
        (comanda) => comanda.barbeiro === barbeiro && comanda.horario === horario
      );

      if (barbeiroJaAgendado) {
        setErroAgendamento(
          'O barbeiro já está agendado nesse horário. Por favor, escolha outro horário ou barbeiro.'
        );
      } else {
        const valor = calcularValorComanda(tipoCorte);
        const novaComanda = { nome, telefone, barbeiro, horario, tipoCorte, valor, formaPagamento };

        const comandaExistente = comandas.find(
          (comanda) => comanda.nome === nome && comanda.telefone === telefone
        );

        if (comandaExistente) {
          const comandaEditada = { ...comandaExistente, ...novaComanda };
          editarComanda(comandaEditada);
        } else {
          adicionarComanda(novaComanda);
        }

        navigate('/lista-espera', { state: { comandas: [...comandas, novaComanda] } });

        setNome('');
        setTelefone('');
        setBarbeiro('');
        setTipoCorte([]);
        setErroAgendamento('');
      }
    }
  };

  const handleNavigateHome = () => {
    navigate('/home');
  };

  const handleTipoCorteChange = (event) => {
    setTipoCorte(event.target.value);
  };

  return (
    <div className="container">
      <Typography variant="h2" className="title">
        Recepção
      </Typography>
      <form className="form" onSubmit={handleSubmit}>
        <TextField label="Nome" value={nome} onChange={(event) => setNome(event.target.value)} required className="white-text white-border" />
        <TextField label="Telefone" value={telefone} onChange={(event) => setTelefone(event.target.value)} required className="white-text white-border" />
        <FormControl>
          <InputLabel id="barbeiro-label" className="white-text">Barbeiro</InputLabel>
          <Select labelId="barbeiro-label" value={barbeiro} onChange={(event) => setBarbeiro(event.target.value)} required className="white-border rectangle-button">
            {barbeiros.map((barbeiro) => (
              <MenuItem key={barbeiro.nome} value={barbeiro.nome}>{barbeiro.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="tipo-corte-label" className="white-text">Tipo de corte</InputLabel>
          <Select
            labelId="tipo-corte-label"
            multiple
            value={tipoCorte}
            onChange={handleTipoCorteChange}
            required
            className="white-border rectangle-button"
          >
            {produtos.map((produto) => (
              <MenuItem key={produto.nome} value={produto.nome}>{produto.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="forma-pagamento-label" className="white-text">Forma de pagamento</InputLabel>
          <Select
            labelId="forma-pagamento-label"
            value={formaPagamento}
            onChange={(event) => setFormaPagamento(event.target.value)}
            required
            className="white-border rectangle-button"
          >
            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
            <MenuItem value="Crédito">Crédito</MenuItem>
            <MenuItem value="Débito">Débito</MenuItem>
            <MenuItem value="Pix">Pix</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="subtitle1" className="valor-total">
          Valor Total: R$ {valorTotal.toFixed(2)}
        </Typography>

        <Button type="submit" variant="contained" className="submit-button white-text white-border">
          Abrir Comanda
        </Button>
        <Button variant="contained" className="home-button white-text white-border" onClick={handleNavigateHome}>
          DZ6 HOME
        </Button>
        {erroAgendamento && (
          <Typography variant="body2" color="error" className="error-message">
            {erroAgendamento}
          </Typography>
        )}
      </form>
    </div>
  );
}

export default Recepcao;

function calcularValorComanda(tiposCorte) {
  let valorTotal = 0;

  tiposCorte.forEach((tipoCorte) => {
    const produto = produtos.find((produto) => produto.nome === tipoCorte);
    if (produto) {
      valorTotal += produto.preco;
    }
  });

  return valorTotal;
}