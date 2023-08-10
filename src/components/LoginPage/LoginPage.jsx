import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Box } from "@mui/material";
import cover from "../../images/cover.png";

function LoginPage() {
  const history = useHistory();

  
    return (
      <Box display="flex" justifyContent='center' alignItems='center' paddingTop={10} >
        <Box sx={{margin: 3}} flexBasis={400}>
          <Box component="img" src={cover} />
        </Box>
        <Box sx={{margin: 3}} >
          <LoginForm />
        </Box>
      </Box>
    );
  }

export default LoginPage;
