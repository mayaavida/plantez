import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";


function Search() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [queryString, setQueryString] = useState("");

  //sending query to server upon click of search button
  async function handleSearch(event) {
    event.preventDefault();
    const response = await fetch(
      `/api/species-list?q=${queryString}`
    );

    const body = await response.json();
    console.log('Received on client side', body.data);
    setQueryString("");

    //Sending results of search to reducer
    dispatch({type: 'SET_SEARCH_RESULTS', payload: body.data});

    //Redirecting to search results page
    history.push('/search')
    
  }

  return (
    <Card component="form" onSubmit={handleSearch} sx={{maxWidth:600}}>
      <CardContent>
        <TextField
          label="Search for a plant"
          variant="filled"
          onChange={(event) => setQueryString(event.target.value)}
          value={queryString}
        />
      </CardContent>
      <CardActions>
        <Button type="submit" variant="contained" color='secondary'>
          Search
        </Button>
      </CardActions>
    </Card>
  );

}

export default Search;
