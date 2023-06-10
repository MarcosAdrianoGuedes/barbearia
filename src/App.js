import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import Recepcao from './pages/Recepcao';
import ListaEspera from './pages/ListaEspera';
import Barbeiro from './pages/Barbeiro';
import './pages/Barbeiro.css';
import './pages/Home.css';
import './pages/ListaEspera.css';
import './pages/Recepcao.css';


function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recepcao" element={<Recepcao />} />
          <Route path="/lista-espera" element={<ListaEspera />} />
          <Route path="/barbeiro" element={<Barbeiro />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
