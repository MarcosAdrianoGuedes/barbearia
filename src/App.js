import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import Recepcao from './pages/Recepcao';
import ListaEspera from './pages/ListaEspera';
import Barbeiro from './pages/Barbeiro';

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
