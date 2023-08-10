import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from "@mui/material";

function AddPlantPage() {
  const [nickname, setNickname] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  //Need to fix this. Empty string causes error if user does not put in date
  const [lastWateredDate, setLastWateredDate] = useState("");
  const [notes, setNotes] = useState("");
  const plantToAdd = useSelector((store) => store.plantDetails);
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const addPlantToHousehold = async (event) => {
    event.preventDefault();

    const newPlant = {
      userId: user.id,
      plantId: plantToAdd.id,
      nickname,
      currentLocation,
      lastWateredDate,
      notes,
    };

    //Any reason to use await here? I want to redirect to the user's dashboard once a plant is successfully added
    fetch("/api/plant/add", {
      method: "POST",
      body: JSON.stringify(newPlant),
      headers: { "Content-Type": "application/json" },
    }).catch((error) => {
      console.log(error);
    });

    history.push('/user')
  };

  return (
    <Card
      component="form"
      onSubmit={addPlantToHousehold}
      sx={{ maxWidth: 450 }}
    >
      <CardContent>
        <Typography variant="h5" component="h5">
          Adding {plantToAdd.common_name.toUpperCase()} to household
        </Typography>
        <TextField
          variant="outlined"
          label="Nickname:"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          required
        />
        <TextField
          variant="outlined"
          label="Current Location:"
          value={currentLocation}
          onChange={(event) => setCurrentLocation(event.target.value)}
        />
        <TextField
          variant="outlined"
          type="date"
          label="Last Watered Date:"
          value={lastWateredDate}
          onChange={(event) => setLastWateredDate(event.target.value)}
        />
        <TextField
          variant="outlined"
          label="Notes:"
          multiline
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button type="submit" variant="contained">
          Add to Household
        </Button>
      </CardActions>
    </Card>
  );
}

export default AddPlantPage;
