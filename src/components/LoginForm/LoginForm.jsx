import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from "@mui/material";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: email,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  <h2>Login</h2>
 

  return (
    <Card component="form" onSubmit={login} sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography variant="h3" component="h3">
          Login
        </Typography>
        {errors.loginMessage && (
    <h3 className="alert" role="alert">
      {errors.loginMessage}
    </h3>
  )}
      
        <TextField
          variant="outlined"
          label="Email:"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          variant="outlined"
          type="password"
          label="Password:"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </CardContent>
      <CardActions>
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Button variant="contained" onClick={()=>history.push('/registration')}>
          New User? Register
        </Button>
      </CardActions>
    </Card>
  );
}

export default LoginForm;
