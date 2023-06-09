import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import './ListaEspera.css';
import { getListaComandas, deletarComanda } from './comandaUtils';

function ListaEspera() {
  const location = useLocation();
  const [comandas, setComandas] = useState([]);
  const [senha, setSenha] = useState('');
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);

  useEffect(() => {
    const listaComandas = location.state?.comandas || getListaComandas();
    setComandas(listaComandas);
  }, [location.state]);

  const navigate = useNavigate();

  const handleFinalizarComanda = (index) => {
    const comandaExcluida = comandas[index];
    // Verificar a senha
    if (senha === 'CARDOSODZ6') {
      deletarComanda(comandaExcluida);
      setComandas((prevComandas) => prevComandas.filter((_, i) => i !== index));
      setSenhaIncorreta(false);
    } else {
      setSenhaIncorreta(true);
    }
  };

  const handleVoltarRecepcao = () => {
    navigate('/recepcao');
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
    setSenhaIncorreta(false); // Limpar a mensagem de senha incorreta ao digitar
  };

  return (
    <div className="container">
      <Typography variant="h2" className="title" align="center" gutterBottom>
        Lista de Espera
      </Typography>
      {comandas.length > 0 ? (
        <List className="list">
          {comandas.map((comanda, index) => (
            <ListItem key={index} className="list-item">
              <ListItemText
                className="list-item-text"
                primary={`Nome: ${comanda.nome}`}
                secondary={`Telefone: ${comanda.telefone}`}
                primaryTypographyProps={{ style: { color: '#FFFFFF' } }}
                secondaryTypographyProps={{ style: { color: '#FFFFFF' } }}
              />
              <ListItemText className="list-item-text" primary={`Barbeiro: ${comanda.barbeiro}`} primaryTypographyProps={{ style: { color: '#FFFFFF' } }} />
              <ListItemText className="list-item-text" primary={`Horário: ${comanda.horario}`} primaryTypographyProps={{ style: { color: '#FFFFFF' } }} />
              <ListItemText
                className="list-item-text"
                primary={`Produtos: ${comanda.tipoCorte ? comanda.tipoCorte.join(', ') : ''}`}
                primaryTypographyProps={{ style: { color: '#FFFFFF' } }}
              />
              <ListItemText
                className="list-item-text"
                primary={`Forma de Pagamento: ${comanda.formaPagamento}`}
                primaryTypographyProps={{ style: { color: '#FFFFFF' } }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleFinalizarComanda(index)} className="delete-icon-button">
                  <DeleteIcon className="delete-icon" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" align="center" className="empty-list-message">
          Não há comandas abertas.
        </Typography>
      )}
      <TextField
        label="Senha"
        type="password"
        value={senha}
        onChange={handleSenhaChange}
        error={senhaIncorreta}
        helperText={senhaIncorreta && 'Senha incorreta'}
        className="senha-input white-input" // Adicionado a classe "white-input"
      />
      <Button variant="contained" className="home-button white-text white-border" onClick={handleVoltarRecepcao}>
        Voltar para a Recepção
      </Button>
    </div>
  );
}

export default ListaEspera;