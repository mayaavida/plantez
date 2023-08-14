import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


function UserPlantDetailsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
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

  const { nickname, current_location, last_watered_date, notes, id, user_id } =
    useSelector((store) => store.userPlantDetails);

  const combineArray = (arr) => {
    if (arr.length > 1) {
      return arr.join(", ");
    } else {
      return arr[0];
    }
  };

  const removePlant = (id) => {
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

    fetch(`/api/plant/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        getUserPlants();
      })
      .catch((error) => {
        console.log("Error deleting plant: ", error);
      });

    history.push("/user");
  };

  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" gap={2} sx={{ margin: 3 }}>
        <Button onClick={history.goBack} variant="outlined" color="secondary">
          Back
        </Button>
        <Box
          component="img"
          alt={common_name}
          src={default_image ? default_image.small_url : "Image unavailable"}
        />
        <Typography component="div" variant="h4">
          {common_name.toUpperCase()}
        </Typography>
        <Typography component="div" variant="h5">
          Scientific Name(s):
        </Typography>
        <Typography variant="p" sx={{ fontStyle: "italic" }}>
          {combineArray(scientific_name)}
        </Typography>
        <Button variant="contained" onClick={() => removePlant(id)}>
          Remove from Household
        </Button>
      </Box>
      <Box flexGrow={2} sx={{ margin: 3 }}>
        <Link to='/edit-plant'>
           <EditIcon/> Edit Plant
        </Link>
     
        <Typography variant="h3">"{nickname}"</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Last Watered:
        </Typography>
        <Typography variant="p">{last_watered_date}</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Location:
        </Typography>
        <Typography variant="p">{current_location}</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Sunlight:
        </Typography>
        <Typography variant="p">{combineArray(sunlight)}</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Watering requirements:
        </Typography>
        <Typography variant="p">{watering}</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Poisonous to pets?
        </Typography>
        <Typography variant="p">{poisonous_to_pets ? "Yes" : "No"}</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Notes:
        </Typography>
        <Typography variant="p">{notes}</Typography>
      </Box>
    </Box>
  );
}

export default UserPlantDetailsPage;
