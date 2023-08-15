import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";

function PlantDetailsPage() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const {
    id,
    common_name,
    scientific_name,
    other_name,
    description,
    watering,
    watering_general_benchmark,
    sunlight,
    poisonous_to_pets,
    default_image,
  } = useSelector((store) => store.plantDetails);

  const userPlants = useSelector((store) => store.userPlants);
  const currentPlant = userPlants.filter((plant) => plant.plant_api_id === id);

  const combineArray = (arr) => {
    if (arr.length > 1) {
      return arr.join(", ");
    } else {
      return arr[0];
    }
  };

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ margin: 3 }}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Button onClick={history.goBack} variant="outlined" color="secondary">
          Back to Search Results
        </Button>
        {/* //Is it possible to add text before common_name in alt? */}
        <Box
          component="img"
          alt={common_name}
          src={default_image ? default_image.small_url : "Image unavailable"}
        
        />
        <Typography component="div" variant="h5">
          {common_name.toUpperCase()}
        </Typography>
        <Typography component="div" variant="h6">
          Scientific Name(s):
        </Typography>
        <Typography variant="p" sx={{ fontStyle: "italic" }}>
          {combineArray(scientific_name)}
        </Typography>
      </Box>
      <Box
        flexGrow={2}
        sx={{ margin: 3}}
        display="flex"
        flexDirection="column"
        gap={2}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
    
        <Typography variant="h6" sx={{ fontWeight: "bold" }} component="div">
          Description:
        </Typography>
        <Typography variant="p" component="div">
          {description}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Sunlight:
        </Typography>
        <Typography variant="p" component="div">
          {combineArray(sunlight)}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Watering requirements:
        </Typography>
        <Typography variant="p" component="div">
          {watering}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Poisonous to pets?
        </Typography>
        <Typography variant="p" component="div">
          {poisonous_to_pets ? "Yes" : "No"}{" "}
        </Typography>
        {user.id ? (
          <Button
            variant="contained"
            onClick={() => history.push("/add-plant")}
          >
            Add to Household
          </Button>
        ) : (
          <Button variant="contained" color='primary' onClick={() => history.push("/login")}>
            Login or Register to Add to Household
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default PlantDetailsPage;
