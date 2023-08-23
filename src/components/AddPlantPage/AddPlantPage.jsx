import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Box,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

function AddPlantPage() {
  const [nickname, setNickname] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [lastWateredDate, setLastWateredDate] = useState("");
  const [wateringInterval, setWateringInterval] = useState("");
  const [notes, setNotes] = useState("");

  const plantToAdd = useSelector((store) => store.plantDetails);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();



  //Information for adding a new plant
  const newPlant = {
    userId: user.id,
    plantId: plantToAdd.id,
    imageUrl: plantToAdd.default_image.small_url,
    nickname,
    currentLocation,
    lastWateredDate,
    wateringInterval: Number(wateringInterval),
    notes,
  };

  //Function to get a specific user's plants
  const getUserPlants = () => {
    fetch(`/api/plant/user/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_USER_PLANTS", payload: data });
      })
      .catch((err) => {
        alert("error getting plants");
        console.log(err);
      });
  };

  //POST request with new plant data
  const addPlantToHousehold = (event) => {
    event.preventDefault();

    console.log("New plant data being added:", newPlant);

    fetch("/api/plant/add", {
      method: "POST",
      body: JSON.stringify(newPlant),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        getUserPlants();
      })
      .catch((error) => {
        console.log(error);
      });

    if(checked === true) {
      history.push("/user")}
      else if(checked === false) {
        dispatch({ type: "SET_USER_PLANT_DETAILS", payload: newPlant });
        history.push('/watering');
      }
  };

  return (
    <Box>
      <Button
        onClick={history.goBack}
        variant="outlined"
        color="secondary"
        sx={{ margin: 2 }}
      >
        Back
      </Button>
      <Box
        component="form"
        onSubmit={addPlantToHousehold}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 3,
          margin: "auto",
          width: 500,
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" component="h5">
          Adding {plantToAdd.common_name.toUpperCase()} to household
        </Typography>
        <TextField
          variant="outlined"
          helperText="Nickname:"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          required
        />
        <TextField
          variant="outlined"
          helperText="Current Location:"
          value={currentLocation}
          onChange={(event) => setCurrentLocation(event.target.value)}
        />
        <TextField
          variant="outlined"
          type="date"
          helperText="Last Watered Date:"
          required
          value={lastWateredDate}
          onChange={(event) => setLastWateredDate(event.target.value)}
        />
        <TextField
          variant="outlined"
          type="number"
          helperText="How often do you want to water this plant? (days):"
          required
          value={wateringInterval}
          onChange={(event) => setWateringInterval(event.target.value)}
        />
           <TextField
          variant="outlined"
          helperText="Notes:"
          rows={4}
          multiline
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
       
        <Button type="submit" variant="contained">
          Add to Household
        </Button>
      </Box>
    </Box>
  );
}

export default AddPlantPage;
