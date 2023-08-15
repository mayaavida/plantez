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

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
    });
  }; // end registerUser

  return (
    <Card
      component="form"
      onSubmit={registerUser}
      sx={{ maxWidth: 500, padding: 2 }}
    >
      <CardContent>
        <Typography variant="h3" component="div" sx={{ margin: 1 }}>
          Register User
        </Typography>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <TextField
          variant="outlined"
          label="First Name:"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
          sx={{ margin: 1 }}
        />
        <TextField
          variant="outlined"
          label="Last Name:"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
          sx={{ margin: 1 }}
        />
        <TextField
          variant="outlined"
          label="Email:"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          sx={{ margin: 1 }}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Password:"
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
          Register
        </Button>
        <Button
          variant="contained"
          onClick={() => history.push("/login")}
          sx={{ margin: 1, marginTop: 0 }}
        >
          Already have an account? Login
        </Button>
      </CardActions>
    </Card>
  );
}

export default RegisterForm;
