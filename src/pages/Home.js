import React, { useState } from 'react';
import { Typography, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'Cardosodz6'; // Defina a senha correta aqui

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEnter = () => {
    if (password === correctPassword) {
      // Redirecionar para a página do barbeiro se a senha estiver correta
      window.location.href = '/barbeiro';
    } else {
      // Exibir mensagem de senha incorreta
      alert('Senha incorreta');
    }
  };

  return (
    <div className="container">
      <div className="top-image">
        <img src="https://pps.whatsapp.net/v/t61.24694-24/321242348_226521809729075_2828230363467295346_n.jpg?ccb=11-4&oh=01_AdRZccdZe59dhL0Z1dWhqFMmfUuguC3lphW70w1GqO8C9A&oe=64A8AC99" alt="Profile" />
      </div>
      <Container maxWidth="sm" className="button-container">
        <Link to="/recepcao" className="button reception-button">
          Recepção
        </Link>
        <Link to="/lista-espera" className="button waiting-list-button">
          Lista de Espera
        </Link>
        <Button to="/barbeiro" className="button barbeiro" onClick={handleOpen}>
          Barbeiro
        </Button>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Senha</DialogTitle>
        <DialogContent>
          <TextField
            label="Digite a senha"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleEnter}>Entrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
