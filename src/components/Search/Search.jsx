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


//Does not work, figure out why
const API_KEY = process.env.REACT_APP_PERENUAL_API_KEY;

function Search() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [queryString, setQueryString] = useState("");

  //sending query to API upon click of search button
  async function handleSearch(event) {
    event.preventDefault();
    const response = await fetch(
      `https://perenual.com/api/species-list?key=${API_KEY}&q=${queryString}`
    );
    //NEED TO REMOVE API KEY
    const body = await response.json();
    console.log(body.data);
    setQueryString("");

    //Sending results of search to reducer
    dispatch({type: 'SET_SEARCH_RESULTS', payload: body.data});

    //Redirecting to search results page
    history.push('/search')
    
  }

  return (
    <Card component="form" onSubmit={handleSearch}>
      <CardContent>
        <TextField
          label="Search for a plant"
          variant="filled"
          onChange={(event) => setQueryString(event.target.value)}
          value={queryString}
        />
      </CardContent>
      <CardActions>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </CardActions>
    </Card>
  );

}

export default Search;
