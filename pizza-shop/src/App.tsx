import React from 'react';
import './App.css'
import { Container } from "@mui/material";
//import PizzaGrid from './components/PizzaOrderPage/PizzaGrid';
import OrderTracking from './components/OrderTracker';
import { useState, useEffect } from 'react';

type OrderStatus = "received" | "preparing" | "ready" | "baking";

interface PizzaOrder {
  id: string;
  customerName: string;
  items: string[];
  status: OrderStatus;
  timestamp: Date;
}

function App() {
  const [orders, setOrders] = useState<PizzaOrder[]>([
    {id: "1", customerName: "Jared", items: ["Cheese"], status: "received" as OrderStatus, timestamp: new Date()},
    {id: "2", customerName: "Kenneth", items: ["Hawaiian"], status: "received" as OrderStatus, timestamp: new Date()}
  ]);

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus => {
    const statusFlow: Record<OrderStatus, OrderStatus> = {
      'received': 'preparing',
      'preparing': 'baking',
      'baking': 'ready',
      'ready': 'ready'
    };
    return statusFlow[currentStatus];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(currentOrders => 
        currentOrders.map(order => ({
          ...order,
          status: getNextStatus(order.status)
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div style={{paddingTop: "64px"}}>
          <Container>
            {/* <PizzaGrid /> */}
            <OrderTracking orders={orders} />
          </Container>
      </div>
  );
}

export default App
