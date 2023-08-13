import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import Logo from "../../images/Logo.png";

function Search() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.user);
  const [queryString, setQueryString] = useState("");

  //sending query to server upon click of search button
  async function handleSearch(event) {
    event.preventDefault();
    const response = await fetch(`/api/species-list?q=${queryString}`);

    const body = await response.json();
    console.log("Received on client side", body.data);
    setQueryString("");

    //Sending results of search to reducer
    dispatch({ type: "SET_SEARCH_RESULTS", payload: body.data });

    //Redirecting to search results page
    history.push("/search");
  }

  return (
    <Box display="flex" flexDirection="column" gap={5} alignItems="center">
      <Box component="img" src={Logo} maxWidth={400} marginTop={5} />
      <Typography variant="h3" component="h2">
        {id
          ? "Find your household plants!"
          : "Never kill your houseplants again"}
      </Typography>
      <Card
        component="form"
        onSubmit={handleSearch}
        sx={{ minWidth: 400, display: 'flex', padding: 2}}
      >
        <CardContent >
          <TextField
            label="Search for a plant"
            variant="filled"
            onChange={(event) => setQueryString(event.target.value)}
            value={queryString}
            sx={{ width: 400 }}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="secondary" >
            Search
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Search;
