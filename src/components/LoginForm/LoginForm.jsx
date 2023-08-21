import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from "@mui/material";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: email,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  <h2>Login</h2>;

  return (
    <Card component="form" onSubmit={login} sx={{ maxWidth: 500, padding: 2 }}>
      <CardContent>
        <Typography variant="h3" component="div" sx={{ margin: 1 }}>
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
          color="secondary"
          onChange={(event) => setEmail(event.target.value)}
          required
          sx={{ margin: 1 }}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Password:"
          color="secondary"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          sx={{ margin: 1 }}
        />
      </CardContent>
      <CardActions sx={{ margin: 1, marginTop: 0 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ margin: 1, marginTop: 0 }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => history.push("/registration")}
          color="secondary"
          sx={{ margin: 1, marginTop: 0 }}
        >
          New user? Register
        </Button>
      </CardActions>
    </Card>
  );
}

export default LoginForm;
