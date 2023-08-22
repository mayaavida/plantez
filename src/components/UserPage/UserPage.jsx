import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  List,
  ListItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import plant from "../../images/plant.png";

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const userPlants = useSelector((store) => store.userPlants);

  //List of user plants with a next_watering_date
  const plantsWithWaterDate = userPlants.filter(
    (plant) => plant.next_watering_date !== null
  );

  //Sorting the list by next_watering_date
  plantsWithWaterDate.sort(function (a, b) {
    let keyA = new Date(a.next_watering_date);
    let keyB = new Date(b.next_watering_date);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  //Handling click of details button for each plant
  const getPlantDetails = async (plantApi, plantId) => {
    //Getting details from API for specific plant
    const apiResponse = await fetch(`/api/species-details/${plantApi}`);
    const apiBody = await apiResponse.json();

    //Sending plant details from API to reducer
    dispatch({ type: "SET_PLANT_DETAILS", payload: apiBody });

    //Getting user details for specific plant
    const userPlantDetails = userPlants.filter((plant) => plant.id === plantId);

    //Sending user details on plant to reducer
    dispatch({ type: "SET_USER_PLANT_DETAILS", payload: userPlantDetails[0] });

    //Redirecting to plant details page
    history.push("/user-plant-details");
  };

  //GET request for user plants
  const getUserPlants = () => {
    fetch(`/api/plant/user/${user.id}`)
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

  //Handle click on watering icon
  const updateWateredDate = (idToUpdate, plantWateringInterval) => {
    let currentDate = new Date().toJSON().slice(0, 10);

    //PUT request to update watering date
    fetch(`/api/plant/update-watering/${idToUpdate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wateredDate: currentDate,
        wateringInterval: plantWateringInterval,
      }),
    })
      .then((response) => {
        getUserPlants();
      })
      .catch((error) => {
        console.log("Error updating plant: ", error);
      });
  };

  return (
    <Box>
      <Box sx={{ width: 400, margin: "auto", padding: 4 }}>
        <Typography component="div" variant="h3">
          Hello, {user.first_name}!
          <img src={plant} alt="icon of PlantEZ plant" height={50} />
        </Typography>
      </Box>
      <Box display="flex" justifyContent='space-around'>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          padding={2}
          justifyContent="space-evenly"
        >
          {userPlants.map((plant) => (
            <Card
              key={plant.nickname}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 0,
                height: 315,
              }}
            >
              <CardContent sx={{ paddingBottom: 0, textAlign: "center" }}>
                <Typography component="h5" variant="h5">
                  "{plant.nickname}"
                </Typography>
              </CardContent>
              <CardActions sx={{ alignItems: "center" }}>
                <Button
                  onClick={() => getPlantDetails(plant.plant_api_id, plant.id)}
                  color="secondary"
                  variant="text"
                  sx={{ width: 4, margin: "auto", padding: 0 }}
                >
                  Details
                </Button>
              </CardActions>
              {plant.image_url ? (
                <CardMedia
                  component="img"
                  height="220"
                  src={plant.image_url}
                  alt={"Image of a household plant"}
                ></CardMedia>
              ) : (
                <Typography variant="span" component="div">
                  No image available
                </Typography>
              )}
            </Card>
          ))}
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          flexDirection="column"
          borderRadius={1}
          gap={3}
          marginLeft={3}
          marginRight={3}
          marginTop={2}
          padding={2}
          minWidth={325}
          alignItems="center"
          sx={{ boxShadow: 2 }}
        >
          <Typography component="div" variant="h4" sx={{ textAlign: "center" }}>
            Household Summary
          </Typography>
          <Typography component="div" variant="h6">
            Total Plants: {userPlants.length}
          </Typography>
          <Link to="/home">
            <Button variant="contained" color="primary">
              Add more plants
            </Button>
          </Link>
          {plantsWithWaterDate.length > 0 && (
            <>
              <Typography
                component="div"
                variant="h5"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                Upcoming Watering Dates:
              </Typography>
              <List sx={{ padding: 0 }}>
                {plantsWithWaterDate.map((plant) => (
                  <ListItem
                    key={plant.id}
                    divider
                    sx={{ margin: 1, padding: 0 }}
                    variant="h6"
                  >
                    {plant.nickname}: {plant.next_watering_date}
                    <Tooltip title="Record Watering" placement="right" arrow>
                      <IconButton
                        onClick={() =>
                          updateWateredDate(plant.id, plant.watering_interval)
                        }
                      >
                        <WaterDropIcon sx={{ color: "#75c9c8" }} />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
