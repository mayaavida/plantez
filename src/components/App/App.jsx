import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

//Components
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import UserPage from "../UserPage/UserPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import SearchResults from "../SearchResults/SearchResults";
import PlantDetailsPage from "../PlantDetailsPage/PlantDetailsPage";
import SearchHome from "../SearchHome/SearchHome";
import AddPlantPage from "../AddPlantPage/AddPlantPage";
import UserPlantDetailsPage from "../UserPlantDetailsPage/UserPlantDetailsPage";
import EditPlantPage from "../EditPlantPage/EditPlantPage";
import TechPage from "../TechPage/TechPage";

import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#EFF5EB",
      },
      secondary: {
        main: "#1C300E",
      },
    },
    typography: {
      fontFamily: "Montserrat, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <ProtectedRoute exact path="/user">
              <UserPage />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? <Redirect to="/user" /> : <LoginPage />}
            </Route>

            <Route exact path="/registration">
              {user.id ? <Redirect to="/user" /> : <RegisterPage />}
            </Route>

            <Route exact path="/home">
              <SearchHome />
            </Route>
            <Route exact path="/search">
              <SearchResults />
            </Route>
            <Route exact path="/plant-details">
              <PlantDetailsPage />
            </Route>
            <Route exact path="/add-plant">
              <AddPlantPage />
            </Route>
            <Route exact path="/user-plant-details">
              <UserPlantDetailsPage />
            </Route>
            <Route exact path="/edit-plant">
              <EditPlantPage />
            </Route>
            <Route exact path="/tech">
              <TechPage />
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
