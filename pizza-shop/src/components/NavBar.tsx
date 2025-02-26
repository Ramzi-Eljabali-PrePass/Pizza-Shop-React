import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";

export default function Navbar({ shopName }: { shopName: string }) {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          🍕 {shopName}
        </Typography>
        <Button color="inherit">Finish</Button>
      </Toolbar>
    </AppBar>
  );
}