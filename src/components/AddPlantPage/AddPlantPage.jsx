import React from "react";
import { useSelector } from "react-redux";
import { useState } from 'react';
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
    const [nickname, setNickname] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [lastWateredDate, setLastWateredDate] = useState('');
    const [notes, setNotes] = useState('');
    const plantToAdd = useSelector(store => store.plantDetails);
    const user = useSelector(store => store.user);
    console.log('plant to add:', plantToAdd)
    console.log('user info', user);

    const addPlantToHousehold = async (event) => {
        event.preventDefault();

        const newPlant = {
            userId: user.id,
            plantId: plantToAdd.id,
            nickname,
            currentLocation,
            lastWateredDate,
            notes
        };

        const response = await fetch('/api/plant/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newPlant)
        });
      

    }

    return(
        <Card component="form" onSubmit={addPlantToHousehold} sx={{ maxWidth: 450 }}>
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
    )

}

export default AddPlantPage;