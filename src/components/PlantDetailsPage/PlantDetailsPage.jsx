import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";

function PlantDetailsPage() {
    const user = useSelector(store => store.user);
    console.log(user.id ? 'yes' : 'no');
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

  return (
    <Box display="flex" >
      <Box display="flex" flexDirection="column" gap={2} sx={{margin: 3}}>
        {/* //Is it possible to add text before common_name in alt? */}
        <Box
          component="img"
          alt={common_name}
          src={default_image ? default_image.small_url : "Image unavailable"}
        />
        <Typography component="div" variant="h3">
          {common_name.toUpperCase()}
        </Typography>
        <Typography component="div" variant="h4">
          Scientific Name(s):
          {scientific_name.map((name) => (
            <Typography
              variant="h5"
              component="h5"
              sx={{ fontStyle: "italic" }}
              key={name}
            >
              {name}
            </Typography>
          ))}
        </Typography>
        <Button variant="contained">Add to Household</Button>
      </Box>
      <Box flexGrow={2} sx={{margin: 3}}>
        <Typography variant="div" sx={{ fontWeight: "bold" }}>
          Description:
        </Typography>
        <Typography variant="div">{description}</Typography>
      </Box>
    </Box>
  );
}

export default PlantDetailsPage;
