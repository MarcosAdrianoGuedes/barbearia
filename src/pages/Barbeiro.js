import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, Button } from '@mui/material';
import './Barbeiro.css';
import { useNavigate } from 'react-router-dom';

function Barbeiro() {
  const [comandas, setComandas] = useState([]);
  const [barbeiros] = useState([
    { nome: 'Rodrigo', comissao: 50 },
    { nome: 'Geovane', comissao: 50 },
    { nome: 'Cardoso', comissao: 70 },
  ]);
  const [produtos] = useState([
    { nome: 'Corte', preco: 25 },
    { nome: 'Barba', preco: 25 },
    { nome: 'Sobrancelha', preco: 10 },
    { nome: 'Pigmentação', preco: 10 },
    { nome: 'Graxa', preco: 25 },
    { nome: 'Progressiva', preco: 40 },
    { nome: 'Hidratação', preco: 10 },
    { nome: 'Limpeza de pele', preco: 15 },
    { nome: 'Platinado', preco: 100 },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const comandasRecebidas = window.history.state?.comandas;
    if (comandasRecebidas) {
      setComandas(comandasRecebidas);
    } else {
      const listaComandas = JSON.parse(localStorage.getItem('comandas')) || [];
      setComandas(listaComandas);
    }
  }, []);

  const calcularGanhosComissao = (barbeiro) => {
    const barbeiroInfo = barbeiros.find((b) => b.nome === barbeiro);
    if (barbeiroInfo) {
      const comandasBarbeiro = comandas.filter((comanda) => comanda.barbeiro === barbeiro);
      let totalComissao = 0;
      comandasBarbeiro.forEach((comanda) => {
        const valorTotal = comanda.valor; // Utilize o valor total da comanda já calculado
        const comissao = (valorTotal * barbeiroInfo.comissao) / 100;
        totalComissao += comissao;
      });
      return totalComissao.toFixed(2);
    }
    return 0;
  };

  const handleNavigateHome = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <Typography variant="h2" className="title">
        Barbeiro
      </Typography>
      {barbeiros.map((barbeiro) => (
        <div className="barbeiro-container" key={barbeiro.nome}>
          <Typography variant="h4" className="barbeiro-name">
            {barbeiro.nome}
          </Typography>
          {comandas.length > 0 ? (
            <div>
              <Typography variant="h6">Comandas de Atendimento</Typography>
              <List className="comandas-list">
                {comandas
                  .filter((comanda) => comanda.barbeiro === barbeiro.nome)
                  .map((comanda) => (
                    <ListItem key={comanda.id} className="comanda-item">
                      <div className="comanda-info">
                        <span className="comanda-cliente">{comanda.cliente}</span>
                        <span className="comanda-valor">Valor: R$ {comanda.valor.toFixed(2)}</span>
                      </div>
                    </ListItem>
                  ))}
              </List>
            </div>
          ) : (
            <Typography variant="body1">Não há comandas de atendimento para {barbeiro.nome}.</Typography>
          )}
          <Typography variant="h6" className="relatorio-title">
            Relatório de Ganhos de Comissão
          </Typography>
          <Typography variant="body1" className="relatorio-ganhos">
            Ganhos de Comissão para {barbeiro.nome}: R$ {calcularGanhosComissao(barbeiro.nome)}
          </Typography>
        </div>
      ))}
      <div className="fechamento-geral">
        <Typography variant="h4" className="fechamento-geral-title">
          Fechamento Geral
        </Typography>
        <Typography variant="body1" className="fechamento-geral-valor">
          Valor Geral do Dia: R$ {comandas.reduce((total, comanda) => total + comanda.valor, 0).toFixed(2)}
        </Typography>
      </div>
      <Button variant="contained" onClick={handleNavigateHome}>
        HOME
      </Button>
    </div>
  );
}

export default Barbeiro;