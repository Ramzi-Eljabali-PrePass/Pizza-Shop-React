import React, { StrictMode }  from "react"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import NavBar from "./components/NavBar"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavBar shopName="Jared's Pizza Shop"/> 
    <App />
  </StrictMode>,
)
