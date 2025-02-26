import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🍕 Pizza Shop
        </Typography>
        <Button color="inherit">Cart</Button>
      </Toolbar>
    </AppBar>
  );
}