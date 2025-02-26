import React from 'react';
import './App.css'
import { Container } from "@mui/material";
import PizzaGrid from './components/PizzaOrderPage/PizzaGrid';

function App() {
  return (
      <div style={{paddingTop: "64px"}}>
          <Container>
            <PizzaGrid />
          </Container>
      </div>
  );
}

export default App
