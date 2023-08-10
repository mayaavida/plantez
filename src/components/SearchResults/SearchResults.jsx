import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import PlantCard from "../PlantCard/PlantCard.jsx";

function SearchResults() {
  //Grabbing search results from store
  const searchResults = useSelector((store) => store.searchResults);
  console.log('Search results:', searchResults);

  return (
    <Box>
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
