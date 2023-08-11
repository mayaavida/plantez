import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";

function UserPage() {
  const user = useSelector((store) => store.user);
  const userPlants = useSelector((store) => store.userPlants);
  console.log(userPlants);


  return (
    <Box>
      <Box>
        <Typography component="h2" variant="h3">
          Hello, {user.first_name}!
        </Typography>
      </Box>
      <Box display="flex">
        <Box>
        </Box>
        <Box>
          <LogOutButton />
        </Box>
      </Box>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
