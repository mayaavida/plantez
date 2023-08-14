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
  const { nickname, current_location, last_watered_date, notes, id, user_id } =
    useSelector((store) => store.userPlantDetails);
  const history = useHistory();
  const [newNickname, setNewNickname] = useState(nickname);
  const [newLocation, setNewLocation] = useState(current_location);
  const [newWateredDate, setNewWateredDate] = useState(last_watered_date);
  const [newNotes, setNewNotes] = useState(notes);

  const updatePlant = () => {};

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
          helperText="Last Watered Date"
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
