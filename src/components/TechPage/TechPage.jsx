import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import plant from "../../images/plant.png";

function TechPage() {
  return (
    <Box sx={{ padding: 5, margin: 5, textAlign: "center" }}>
      <Typography variant="h5" component="div">
        PlantEZ uses the following technologies:
      </Typography>
      <Box>
      <List sx={{ display: 'inline-block' }}>
          <ListItem>Node</ListItem>
          <ListItem>Express</ListItem>
          <ListItem>React</ListItem>
          <ListItem>Redux</ListItem>
          <a href='https://perenual.com/docs/api' target="_blank">
          <ListItem>Perenual Plant API</ListItem>
          </a>
          <ListItem>Material UI</ListItem>
          <ListItem>PostgreSQL</ListItem>
          <ListItem>Heroku</ListItem>
          
        </List>
      </Box>
        
      <Typography variant="h6" component='div' sx={{maxWidth: 500, margin: 'auto'}}>
        Thank you to the fantastic students and instructors at Prime Academy. I am so grateful for your support and guidance!
      </Typography>
      <Box component="img" src={plant} height={75} sx={{margin:3}}></Box>
    </Box>
  );
}

export default TechPage;
