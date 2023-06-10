import './App.css';
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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
    <HashRouter basename='/barbearia'>
      <Container>
        <Routes>
          <Route path="/barbearia" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recepcao" element={<Recepcao />} />
          <Route path="/lista-espera" element={<ListaEspera />} />
          <Route path="/barbeiro" element={<Barbeiro />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
