import React from "react";
import { useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";
import { useHistory } from 'react-router-dom';
import PlantCard from "../PlantCard/PlantCard.jsx";

function SearchResults() {
  //Grabbing search results from store
  const searchResults = useSelector((store) => store.searchResults);
  const history = useHistory();
  console.log('Search results:', searchResults);

  return (
    <Box>
      <Button onClick={history.goBack} variant='outlined' color='secondary'>Back to search</Button>
      <Typography variant="h3" component="h2">
        Search Results
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {/* Create separate plant card component, send plant as prop, should be able to remove function from onClick to its own function*/}
        {searchResults.map((plant) => (
          <PlantCard plant={plant} key={plant.id} />
        ))}
      </Box>
    </Box>
  );
}

export default SearchResults;
