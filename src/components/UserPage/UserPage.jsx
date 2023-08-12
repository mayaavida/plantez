import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";

function UserPage() {
  const user = useSelector((store) => store.user);
  const userPlants = useSelector((store) => store.userPlants);
  console.log(userPlants);

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
                  {plant.nickname}
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
