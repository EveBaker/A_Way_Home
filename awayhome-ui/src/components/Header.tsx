import React from 'react';
import { AppBar, Toolbar, Typography, Button } from './MaterialComponents';

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="bg-page-bg-primary">
      <Toolbar>
        <Typography variant="h6" className="flex-grow font-sumana font-bold text-light-text">
          My App
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
