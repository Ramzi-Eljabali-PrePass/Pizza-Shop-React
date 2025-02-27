import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NavBar({ shopName, cartItemCount, onCartClicked }: 
  { shopName: string, cartItemCount: number, onCartClicked: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          🍕 {shopName}
        </Typography>
        <div>
          {location.pathname === '/order-tracking' ? (
            <IconButton color="inherit" onClick={() => navigate('/')}>
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/order-tracking')}
                sx={{ mr: 2 }}
              >
                Check Order Status
              </Button>
              <IconButton color="inherit" onClick={onCartClicked}>
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}