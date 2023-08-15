import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';

function LogOutButton() {
  const dispatch = useDispatch();
  return (
    <Link to='/home'>
      <Button
      variant='contained' bgcolor='primary'
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
    </Link>
  
  );
}

export default LogOutButton;
