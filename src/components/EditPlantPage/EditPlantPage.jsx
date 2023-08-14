import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from "@mui/material";

function EditPlantPage() {
  const { nickname, current_location, last_watered_date, notes, id, user_id } =
    useSelector((store) => store.userPlantDetails);
  const [newNickname, setNewNickname] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newWateredDate, setNewWateredDate] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const updatePlant = () => {};

  return (
    <Card component="form" onSubmit={updatePlant} sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography variant="h3" component="h3">
          Editing "{nickname}"
        </Typography>
        <TextField
          variant="outlined"
          label={nickname}
          value={newNickname}
          onChange={(event) => setNewNickname(event.target.value)}
          helperText="Nickname"
        />
        <TextField
          variant="outlined"
          label={current_location}
          value={newLocation}
          onChange={(event) => setNewLocation(event.target.value)}
          helperText="Current Location"
        />
        <TextField
          variant="outlined"
          label={last_watered_date}
          type="date"
          value={newWateredDate}
          onChange={(event) => setNewWateredDate(event.target.value)}
          helperText="Last Watered Date"
        />
        <TextField
          variant="outlined"
          label={notes}
          value={newNotes}
          onChange={(event) => setNewNotes(event.target.value)}
          multiline
          helperText="Notes"
        />
      </CardContent>
      <CardActions>
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </CardActions>
    </Card>
  );
}

export default EditPlantPage;
