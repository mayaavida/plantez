import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Box,
  Typography
} from "@mui/material";
import cover from '../../images/cover.png';



function Search() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useSelector(store => store.user)
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
    <Box>
      <Box component='img'src={cover}/>
      <Typography variant='h2' component='h1'>
        {id ? 'Find your household plants!' : 'Never kill your houseplants again'}
      </Typography>
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
    </Box>
   
  );

}

export default Search;