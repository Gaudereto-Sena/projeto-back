import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import ModalAdicionarInvestimento from './components/ModalAdicionarAtivo'
import { useAdicionarOperacaoContext } from './Contextos/DadosInvestimentos.js';
import Carteira from './pages/Carteira.jsx';

function App() {
  const { showModal } = useAdicionarOperacaoContext()
  return (
    <BrowserRouter>
      <Menu />
      {showModal && <ModalAdicionarInvestimento />}
      <Routes>
        <Route path='/' element={<Carteira />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
