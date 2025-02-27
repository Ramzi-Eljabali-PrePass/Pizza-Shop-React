import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { collection, onSnapshot, query, orderBy, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import confetti from 'canvas-confetti';

interface PizzaOrder {
  id: string;
  customerName: string;
  items: string[];
  status: 'received' | 'preparing' | 'baking' | 'ready';
  timestamp: Date;
  lastUpdated?: Date;
}

const StyledColumn = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 'calc(100vh - 32px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey[50],
  position: 'relative',
  maxHeight: 'calc(100vh - 32px)',
}));

const OrderList = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  '& > *:not(:last-child)': {
    marginBottom: '12px',
  },
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const ScrollWrapper = styled(Box)({
  width: '100%',
  height: 'calc(100vh - 32px)',
  display: 'flex',
  overflow: 'hidden',
});

const OrderTracker: React.FC = () => {
  const [orders, setOrders] = useState<PizzaOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [celebration, setCelebration] = useState<string | null>(null);

  useEffect(() => {
    // Create a query to fetch orders sorted by timestamp
    const ordersQuery = query(
      collection(db, 'orders'),
      orderBy('timestamp', 'desc')
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          customerName: data.customerName,
          items: data.items,
          status: data.status as PizzaOrder['status'],
          timestamp: (data.timestamp as Timestamp).toDate(),
          lastUpdated: data.lastUpdated ? (data.lastUpdated as Timestamp).toDate() : undefined
        };
      });
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching orders:', error);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const triggerConfetti = () => {
    // Fire confetti from the left edge
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.6 }
    });

    // Fire confetti from the right edge
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.6 }
    });
  };

  useEffect(() => {
    const INTERVAL = 10000; // 10 seconds

    const moveOrder = async (order: PizzaOrder) => {
      let newStatus = order.status;
      switch (order.status) {
        case 'received':
          newStatus = 'preparing';
          break;
        case 'preparing':
          newStatus = 'baking';
          break;
        case 'baking':
          newStatus = 'ready';
          break;
        case 'ready':
          return; // Don't process ready orders
      }

      const now = new Date();
      const orderRef = doc(db, 'orders', order.id);
      
      try {
        await updateDoc(orderRef, {
          status: newStatus,
          lastUpdated: now
        });

        if (newStatus === 'ready') {
          triggerConfetti();
          setCelebration(`${order.customerName}'s order is ready!`);
          
          // Remove ready order after 10 seconds
          setTimeout(async () => {
            await updateDoc(orderRef, {
              status: 'completed'
            });
          }, INTERVAL);
        }
      } catch (error) {
        console.error('Error updating order:', error);
      }
    };

    const interval = setInterval(() => {
      const now = new Date();
      
      orders.forEach(order => {
        const timeSinceLastUpdate = order.lastUpdated 
          ? now.getTime() - order.lastUpdated.getTime()
          : now.getTime() - order.timestamp.getTime();

        if (timeSinceLastUpdate >= INTERVAL && order.status !== 'ready') {
          moveOrder(order);
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [orders]);

  const getOrdersByStatus = (status: PizzaOrder['status']) => {
    return orders.filter(order => order.status === status);
  };

  const renderOrderCard = (order: PizzaOrder) => (
    <Card key={order.id} sx={{ '&:hover': { transform: 'translateY(-2px)', transition: 'transform 0.2s' } }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order #{order.id.slice(0, 8)}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Customer: {order.customerName}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ my: 1 }}>
          {order.items.map((item, index) => (
            <Chip
              key={index}
              label={item}
              size="small"
              sx={{ my: 0.5 }}
            />
          ))}
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right' }}>
          {order.timestamp.toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  );

  const columns = [
    { title: 'Order Received', status: 'received' },
    { title: 'Preparing', status: 'preparing' },
    { title: 'Baking', status: 'baking' },
    { title: 'Ready', status: 'ready' },
  ] as const;

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <Box sx={{ 
      p: 2, 
      bgcolor: 'background.default', 
      height: '100vh',
      overflow: 'hidden'
    }}>
      <ScrollWrapper>
        <Grid 
          container 
          spacing={2} 
          sx={{ 
            flexWrap: 'nowrap',
            width: '100%',
          }}
        >
          {columns.map(({ title, status }) => (
            <Grid 
              item 
              key={status} 
              sx={{ 
                flex: 1,
                minWidth: '300px',
              }}
            >
              <StyledColumn elevation={1}>
                <Typography variant="h5" gutterBottom align="center" sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                  {title}
                </Typography>
                <OrderList>
                  {getOrdersByStatus(status).map(renderOrderCard)}
                </OrderList>
              </StyledColumn>
            </Grid>
          ))}
        </Grid>
      </ScrollWrapper>
      <Snackbar
        open={!!celebration}
        autoHideDuration={3000}
        onClose={() => setCelebration(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setCelebration(null)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {celebration}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderTracker;
