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
} from "@mui/material";
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

  return (
    <Box>
      <Box sx={{ width: 400, margin: "auto", padding: 4 }}>
        <Typography component="div" variant="h3">
          Hello, {user.first_name}!
          <img src={plant} alt="icon of PlantEZ plant" height={50} />
        </Typography>
      </Box>
      <Box display="flex">
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          padding={2}
          justifyContent="space-evenly"
        >
          {userPlants.map((plant) => (
            <Card key={plant.nickname} sx={{ boxShadow: 2 }}>
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
                  height="175"
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
          flexGrow={2}
          gap={3}
          marginLeft={3}
          marginRight={3}
          marginTop={2}
          padding={2}
          minWidth={275}
          alignItems="center"
          sx={{ boxShadow: 2 }}
        >
          <Typography component="div" variant="h4" sx={{ textAlign: "center" }}>
            Household Summary
          </Typography>
          <Typography component="div" variant="h6" >
            Total Plants: {userPlants.length}
          </Typography>
          <Typography component="div" variant="h5" sx={{ textAlign: "center" }}>
            Upcoming Watering Dates:
          </Typography>
          <List>
          {plantsWithWaterDate.map((plant) => (
              <ListItem key={plant.id} id={plant.id} button divider sx={{textAlign: 'center'}} variant='h6'>
                {plant.nickname}: {plant.next_watering_date}
              </ListItem>
            ))}
          </List>
          <Link to="/home">
            <Button variant="contained" color="secondary">
              Add more plants
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
