import React from "react";
import { Link, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import {
  Box,
  AppBar,
  Typography,
  Button,
  IconButton,
  Toolbar,
  Input,
} from "@mui/material";
import planteez from "../../images/planteez.png";

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/home">
          <img src={planteez} alt="PlantEZ logo" height={25} />
        </Link>
        {!user.id && (
          // If there's no user, show login/registration links
          <Button
            variant="contained"
            bgcolor="secondary"
            onClick={()=>history.push('/login')}
          >
            Login or Register
          </Button>
        )}
        {user.id && (
          <>
            <Button
              variant="contained"
              bgcolor="secondary"
              onClick={()=>history.push('/user')}
            >
              My Plants
            </Button>
            <LogOutButton />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
