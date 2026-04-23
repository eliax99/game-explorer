import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import GameProvider from './context/GameContext'
import "./styles/index.css";
import "./styles/loader.module.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GameProvider>
      <App />
    </GameProvider>
  </BrowserRouter>
)