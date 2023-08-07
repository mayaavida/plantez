import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <>
      <Card component="form" onSubmit={registerUser}>
        <CardContent>
          <Typography variant="h3" component="h3">
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
          />
           <TextField
            variant="outlined"
            label="Last Name:"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
           <TextField
            variant="outlined"
            label="Email:"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
           <TextField
            variant="outlined"
            label="Password:"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </CardActions>
      </Card>
      <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              name="firstName"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
