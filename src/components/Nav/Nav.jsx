import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Box, AppBar, Typography, Button, IconButton, Toolbar, Input } from '@mui/material';
import cover from '../../images/cover.png';
import InputIcon from '@mui/icons-material/Input';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
    <AppBar position='static'>
      <Toolbar>
        <Link to='/home'>
          <img src={cover} alt='PlantEZ logo' width={200}/>
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
   
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
    </>
  );
}

export default Nav;
