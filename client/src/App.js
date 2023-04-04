import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import Carteira from './pages/Carteira.jsx';
import CarteiraSimplificada from './pages/CarteiraSimplificada.jsx';

function App() {
  return (
    <BrowserRouter>
     <Menu />
      <Routes>
        <Route path='/' element={<Carteira />} />
        <Route path='/simplificada' element={<CarteiraSimplificada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
