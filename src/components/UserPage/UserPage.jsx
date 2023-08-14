import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button
} from "@mui/material";

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const userPlants = useSelector((store) => store.userPlants);

  const getPlantDetails = async (plantApi, plantId) => {

    //Getting details from API for specific plant
    const apiResponse = await fetch(`/api/species-details/${plantApi}`);
    const apiBody = await apiResponse.json();

    //Sending plant details from API to reducer
    dispatch({type:'SET_PLANT_DETAILS', payload: apiBody});

    //Getting user details for specific plant
    const userPlantDetails = userPlants.filter((plant) => plant.id === plantId);

    //Sending user details on plant to reducer
    dispatch({type: 'SET_USER_PLANT_DETAILS', payload: userPlantDetails[0]});

    //Redirecting to plant details page
    history.push('/user-plant-details')

  };

  return (
    <Box>
      <Box>
        <Typography component="h2" variant="h3">
          Hello, {user.first_name}!
        </Typography>
      </Box>
      <Box display="flex">
        <Box display="flex" flexWrap='wrap' gap={3} margin={3} padding={1} sx={{border: 1, borderRadius:1, borderColor:'primary'}}>
          {userPlants.map((plant) => (
            <Card key={plant.nickname}>
              <CardContent>
                <Typography component="h5" variant="h5">
                  "{plant.nickname}"
                </Typography>
              </CardContent>
              {plant.image_url ? (
                <CardMedia
                  component="img"
                  height="150"
                  src={plant.image_url}
                  alt={"Image of a household plant"}
                ></CardMedia>
              ) : (
                <Typography variant="span" component="div">
                  No image available
                </Typography>
              )}
              <CardActions>
                <Button onClick={()=>getPlantDetails(plant.plant_api_id, plant.id)} color='secondary' >
                  Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
        <Box display='flex' flexWrap='wrap' flexDirection='column' gap={3} margin={3} padding={1} sx={{border: 1, borderRadius:1, borderColor:'primary'}}>
          <Typography component='div' variant="h3">
            Total Plants: {userPlants.length}
          </Typography>
          <LogOutButton />
        </Box>
      </Box>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
