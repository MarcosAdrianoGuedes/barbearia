import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <div className="top-image">
        <img src="https://pps.whatsapp.net/v/t61.24694-24/321242348_226521809729075_2828230363467295346_n.jpg?ccb=11-4&oh=01_AdSNs33MSLeOG7NC5C5tVo7sscY7F7gGd0wt7QjFJvdSNg&oe=6496E059" alt="Profile" />
      </div>
      <Container maxWidth="sm" className="button-container">
        <Link to="/recepcao" className="button reception-button">
          Recepção
        </Link>
        <Link to="/lista-espera" className="button waiting-list-button">
          Lista de Espera
        </Link>
        <Link to="/barbeiro" className="button barber-button">
          Barbeiro
        </Link>
      </Container>
    </div>
  );
}

export default Home;