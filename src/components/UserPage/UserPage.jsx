import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";

function UserPage() {
  const user = useSelector((store) => store.user);
  const [userPlants, setUserPlants] = useState({});

  const getUserPlants = () => {
    fetch(`/api/plant/user/${user.id}`)
      .then((response) => response.json())
      .then((item) => {
        setUserPlants(item);
        console.log(userPlants);
      });
  };

  useEffect(() => {
    getUserPlants();
  }, []);

  return (
    <Box>
      <Box>
        <Typography component="h2" variant="h3">
          Hello, {user.first_name}!
        </Typography>
      </Box>
      <Box display="flex">
        <Box>
          {userPlants.map(plant => (
            <h2>{plant.nickname}</h2>
          ))}
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
