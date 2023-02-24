import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import InvestimentosProvider from './Contextos/DadosInvestimentos';
import BuscaAtivoProvider from './Contextos/BuscaAcao';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BuscaAtivoProvider>
      <InvestimentosProvider>
        <App />
      </InvestimentosProvider>
    </BuscaAtivoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
