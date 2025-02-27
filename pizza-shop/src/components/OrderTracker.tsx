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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface PizzaOrder {
  id: string;
  customerName: string;
  items: string[];
  status: 'received' | 'preparing' | 'baking' | 'ready';
  timestamp: Date;
}

const StyledColumn = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 'calc(100vh - 100px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey[50],
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

const OrderTracker: React.FC = () => {
  const [orders, setOrders] = useState<PizzaOrder[]>([]);
  const [loading, setLoading] = useState(true);

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
          status: data.status,
          timestamp: (data.timestamp as Timestamp).toDate(),
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
    <Box sx={{ p: 2, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Grid container spacing={2}>
        {columns.map(({ title, status }) => (
          <Grid item xs={12} sm={6} md={3} key={status}>
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
    </Box>
  );
};

export default OrderTracker; 