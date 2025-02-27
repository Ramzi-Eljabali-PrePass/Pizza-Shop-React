import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar({ shopName, cartItemCount, onCartClicked }: 
  { shopName: string, cartItemCount: number, onCartClicked: () => void }) {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          🍕 {shopName}
        </Typography>
        <IconButton color="inherit" onClick={onCartClicked}>
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}