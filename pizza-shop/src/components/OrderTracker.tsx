import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface PizzaOrder {
  id: string;
  customerName: string;
  items: string[];
  status: 'received' | 'preparing' | 'baking' | 'ready';
  timestamp: Date;
}

interface OrderTrackerProps {
  orders: PizzaOrder[];
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

const OrderTracker: React.FC<OrderTrackerProps> = ({ orders }) => {
  const getOrdersByStatus = (status: PizzaOrder['status']) => {
    return orders.filter(order => order.status === status);
  };

  const renderOrderCard = (order: PizzaOrder) => (
    <Card key={order.id} sx={{ '&:hover': { transform: 'translateY(-2px)', transition: 'transform 0.2s' } }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order #{order.id}
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