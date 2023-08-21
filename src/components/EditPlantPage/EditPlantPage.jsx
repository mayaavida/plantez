import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Box,
  autocompleteClasses,
} from "@mui/material";

function EditPlantPage() {
  const { nickname, current_location, last_watered_date, notes, id, user_id, watering_interval } =
    useSelector((store) => store.userPlantDetails);
  const history = useHistory();
  const dispatch = useDispatch();
  const [newNickname, setNewNickname] = useState(nickname);
  const [newLocation, setNewLocation] = useState(current_location);
  const [newWateredDate, setNewWateredDate] = useState(last_watered_date);
  const [newWateringInterval, setNewWateringInterval] = useState(watering_interval);
  const [newNotes, setNewNotes] = useState(notes);

  const updatePlant = (event) => {
    event.preventDefault();
    console.log('New details: ', {
        newNickname,
        newLocation,
        newWateredDate, 
        newWateringInterval,
        newNotes
    })

    const getUserPlants = () => {
        fetch(`/api/plant/user/${user_id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched user plants: ", data);
            dispatch({ type: "SET_USER_PLANTS", payload: data });
          })
          .catch((err) => {
            alert("error getting plants");
            console.log(err);
          });
      };
  
      fetch(`/api/plant/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nickname: newNickname,
            location: newLocation,
            wateredDate: newWateredDate,
            wateringInterval: newWateringInterval,
            notes: newNotes
        })
      })
        .then((response) => {
          getUserPlants();
        })
        .catch((error) => {
          console.log("Error updating plant: ", error);
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
        onSubmit={updatePlant}
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
        <Typography variant="h3" component="h3">
          Editing "{nickname}"
        </Typography>
        <TextField
          variant="outlined"
          defaultValue={newNickname}
          onChange={(event) => setNewNickname(event.target.value)}
          helperText="Nickname"
        />
        <TextField
          variant="outlined"
          defaultValue={newLocation}
          onChange={(event) => setNewLocation(event.target.value)}
          helperText="Current Location"
        />
        <TextField
          variant="outlined"
          type="date"
          defaultValue={newWateredDate}
          onChange={(event) => setNewWateredDate(event.target.value)}
          helperText="Last Watered Date:"
        />
          <TextField
          variant="outlined"
          type="number"
          defaultValue={newWateringInterval}
          onChange={(event) => setNewWateringInterval(event.target.value)}
          helperText="Watering interval (days)"
        />
        <TextField
          variant="outlined"
          defaultValue={newNotes}
          onChange={(event) => setNewNotes(event.target.value)}
          rows={4}
          multiline
          helperText="Notes"
        />
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default EditPlantPage;
