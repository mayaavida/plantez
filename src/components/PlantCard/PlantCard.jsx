import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
} from "@mui/material";
import './PlantCard.css';

function PlantCard({ plant }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, common_name, scientific_name, default_image } = plant;

  //Sending request to server, awaiting response from API
  const handleClick = async () => {
    const response = await fetch(`/api/species-details/${id}`);
    const body = await response.json();
    console.log("Received plant details on client side: ", body);

    //Sending plant details from API to reducer
    dispatch({ type: "SET_PLANT_DETAILS", payload: body });

    //Redirecting to plant details page
    history.push("/plant-details");
  };

  return (
    <Tooltip>
      <Card sx={{ width: 275, margin: 3, marginTop:0 }} onClick={handleClick} className="plant-card" >
        <CardContent>
          <Typography variant="h5" component="h5">
            {common_name.toUpperCase()}
          </Typography>
          <Typography variant="p" component="p" sx={{ fontStyle: "italic" }}>
            {scientific_name}
          </Typography>
        </CardContent>
        {default_image ? (
          <CardMedia
            component="img"
            height="200"
            src={default_image.small_url}
            alt={common_name}
          ></CardMedia>
        ) : (
          <Typography variant="span" component="div" sx={{margin: 2}}>
            No image available
          </Typography>
        )}
      </Card>
    </Tooltip>
  );
}

export default PlantCard;
