import React from 'react';
import './App.css'
import NavBar from './components/NavBar'
import { Container } from "@mui/material";

function App() {
  return (
      <div style={{paddingTop: "64px"}}>
          <NavBar shopName="Jared's Pizza Shop"/> 
          <Container>
            <p>Delicious pizzas, made fresh just for you! 🍕</p>
          </Container>
      </div>
  );
}

export default App
