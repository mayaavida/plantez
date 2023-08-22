import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

function UserPlantDetailsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Details from plant API for a specific plant
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

  //Details from the database for a specific plant
  const {
    nickname,
    current_location,
    last_watered_date,
    watering_interval,
    next_watering_date,
    notes,
    id,
    user_id,
  } = useSelector((store) => store.userPlantDetails);

  //Function to combine array into one string, used in return below
  const combineArray = (arr) => {
    if (arr.length > 1) {
      return arr.join(", ");
    } else {
      return arr[0];
    }
  };

  // function to fetch a user's plants
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

  // function to remove a specific plant from a user's household
  const removePlant = (id) => {
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
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ margin: 3 }}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Button onClick={history.goBack} variant="outlined" color="secondary">
          Back
        </Button>
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
        sx={{ margin: 3 }}
        display="flex"
        flexDirection="column"
        gap={1}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Link to="/edit-plant">
          <EditIcon /> Edit Plant
        </Link>

        <Typography variant="h3">"{nickname}"</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Last Watered:
        </Typography>
        <Typography variant="p">{last_watered_date}</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Watering Interval:
        </Typography>
        <Typography variant="p">{watering_interval}</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Next Watering Date:
        </Typography>
        <Typography variant="p">{next_watering_date}</Typography>
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

        <Box>
          <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleClickOpen}>
            Remove from Household
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {
                "Are you sure you want to delete this plant from your household?"
              }
            </DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => removePlant(id)}
              >
                Yes
              </Button>
              <Button onClick={handleClose} variant="contained" color="secondary">No</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default UserPlantDetailsPage;
