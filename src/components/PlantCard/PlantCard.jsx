import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";

function PlantCard({ plant }) {
  const dispatch = useDispatch();
  const history = useHistory();
    const { id, common_name, scientific_name, default_image } = plant;

  //Sending request to server, awaiting response from API
  const handleClick = async (event) => {
    const plantId = event.target.id;
    const response = await fetch(`/api/species-details/${plantId}`);
    const body = await response.json();
    console.log("Received plant details on client side: ", body);

    //Sending plant details from API to reducer
    dispatch({type:'SET_PLANT_DETAILS', payload: body});

    //Redirecting to plant details page
    history.push('/plant-details')

  };

  return (
    <Card
      sx={{ maxWidth: 275, margin: 3 }}
    >
      <CardContent>
        <Typography variant="h4" component="h4" onClick={handleClick} id={id}>
          {common_name.toUpperCase()}
        </Typography>
        <Typography variant="h5" component="h5" sx={{ fontStyle: "italic" }}>
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
        <Typography variant="span" component="div">
          No image available
        </Typography>
      )}
    </Card>
  );
}

export default PlantCard;
