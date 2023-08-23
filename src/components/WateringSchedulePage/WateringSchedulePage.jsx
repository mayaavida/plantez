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

function WateringSchedulePage() {
    const userPlantDetails = useSelector(store => store.userPlantDetails);
    console.log('User plant details on watering page', userPlantDetails);

    return (
        <h1>This is the Watering Schedule page</h1>
    )
};

export default WateringSchedulePage;