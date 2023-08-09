import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";

function SearchResults() {
  //Grabbing search results from store
  const searchResults = useSelector((store) => store.searchResults);
  console.log(searchResults);

  return (
    <Box>
      <Typography variant="h3" component="h2">
        Search Results
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {searchResults.map((plant) => (
          <Card sx={{ maxWidth: 275, margin: 3 }} id={plant.id}>
            <CardContent>
              <Typography variant="h4" component="h4">
                {plant.common_name.toUpperCase()}
              </Typography>
              <Typography
                variant="h5"
                component="h5"
                sx={{ fontStyle: "italic" }}
              >
                {plant.scientific_name[0]}
              </Typography>
            </CardContent>
            {plant.default_image ? (
              <CardMedia
                component="img"
                height="200"
                src={plant.default_image.small_url}
                alt={plant.common_name}
              ></CardMedia>
            ) : (
              <Typography variant="span" component="div">No image</Typography>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default SearchResults;
