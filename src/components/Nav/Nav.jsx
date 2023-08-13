import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Box, AppBar, Typography, Button, IconButton, Toolbar, Input } from '@mui/material';
import planteez from '../../images/planteez.png';
import InputIcon from '@mui/icons-material/Input';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <AppBar position='static' >
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Link to='/home'>
          <img src={planteez} alt='PlantEZ logo' height={30} />
        </Link>
        {!user.id && (
          // If there's no user, show login/registration links
          <Button variant='contained' bgcolor='secondary' startIcon={<InputIcon />}>
            <Link to="/login">
              Login / Register
            </Link>
          </Button>
        )}
           {user.id && (
            <LogOutButton/>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
