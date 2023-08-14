import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import searchResultsReducer from './search.results.reducer';
import plantDetailsReducer from './plant.details.reducer';
import userPlantsReducer from './user.plants.reducer';
import userPlantDetailsReducer from './user.plant.details.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  searchResults: searchResultsReducer, // contains latest list of search results from perenual plant API
  plantDetails: plantDetailsReducer, // contains details of specific plant that was clicked on from plant API
  userPlants: userPlantsReducer, // contains all of a signed in user's saved plants
  userPlantDetails: userPlantDetailsReducer, // contains details input by user for a particular plant
});

export default rootReducer;
