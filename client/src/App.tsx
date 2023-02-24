import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Carteira from './pages/Carteira';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Carteira />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;