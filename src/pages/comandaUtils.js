const COMANDAS_LOCAL_STORAGE_KEY = 'comandas';

export function useListaComandas() {
  const getListaComandas = () => {
    const listaComandas = JSON.parse(localStorage.getItem(COMANDAS_LOCAL_STORAGE_KEY)) || [];
    return listaComandas;
  };

  const setListaComandas = (comandas) => {
    localStorage.setItem(COMANDAS_LOCAL_STORAGE_KEY, JSON.stringify(comandas));
  };

  const adicionarComanda = (comanda) => {
    const listaComandas = getListaComandas();
    listaComandas.push(comanda);
    setListaComandas(listaComandas);
  };

  const deletarComanda = (comanda) => {
    const listaComandas = getListaComandas();
    const index = listaComandas.findIndex((c) => c.horario === comanda.horario && c.barbeiro === comanda.barbeiro);
    if (index !== -1) {
      listaComandas.splice(index, 1);
      setListaComandas(listaComandas);
    }
  };

  return [getListaComandas(), adicionarComanda, deletarComanda];
}

export function getListaComandas() {
  const listaComandas = JSON.parse(localStorage.getItem(COMANDAS_LOCAL_STORAGE_KEY)) || [];
  return listaComandas;
}

export function deletarComanda(comanda) {
  const listaComandas = getListaComandas();
  const index = listaComandas.findIndex((c) => c.horario === comanda.horario && c.barbeiro === comanda.barbeiro);
  if (index !== -1) {
    listaComandas.splice(index, 1);
    localStorage.setItem(COMANDAS_LOCAL_STORAGE_KEY, JSON.stringify(listaComandas));
  }
}

export const barbeiros = [
  { nome: 'Rodrigo', comissao: 50 },
  { nome: 'Geovane', comissao: 50 },
  { nome: 'Cardoso', comissao: 70 },
  { nome: 'Disponível', comissao: 0 },
];

export const produtos = [
  { nome: 'Corte', preco: 25 },
  { nome: 'Barba', preco: 25 },
  { nome: 'Sobrancelha', preco: 10 },
  { nome: 'Pigmentação', preco: 10 },
  { nome: 'Graxa', preco: 25 },
  { nome: 'Progressiva', preco: 40 },
  { nome: 'Hidratação', preco: 10 },
  { nome: 'Limpeza de pele', preco: 15 },
  { nome: 'Platinado', preco: 100 },
  { nome: 'Corte + Sobrancelha', preco: 30 },
  { nome: 'Corte + Barba + Sobrancelha', preco: 45 },
  { nome: 'Corte + Progressiva', preco: 60 },
];