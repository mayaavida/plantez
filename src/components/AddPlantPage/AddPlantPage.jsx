import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Box, TextField, Typography, Checkbox, Select} from "@mui/material";

function AddPlantPage() {
  const [nickname, setNickname] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  //Need to fix this. Empty string causes error if user does not put in date
  const [lastWateredDate, setLastWateredDate] = useState("");
  const [wateringInterval, setWateringInterval] = useState("");
  const [notes, setNotes] = useState("");
  const plantToAdd = useSelector((store) => store.plantDetails);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

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

  const getUserPlants = () => {
    fetch(`/api/plant/user/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("User plants: ", data);
        dispatch({ type: "SET_USER_PLANTS", payload: data });
      })
      .catch((err) => {
        alert("error getting plants");
        console.log(err);
      });
  };

  const addPlantToHousehold = (event) => {
    event.preventDefault();

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

    history.push("/user");
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
          margin: 'auto',
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
          value={lastWateredDate}
          onChange={(event) => setLastWateredDate(event.target.value)}
        />
        <TextField
          variant="outlined"
          type="number"
          helperText="How often do you want to water this plant? (days):"
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
