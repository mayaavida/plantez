import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER_PLANTS" actions
function* fetchUserPlants(action) {
const userId = action.payload;

try {
    const response = yield fetch(`api/plant/user/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const userPlants = yield response.json();

    yield put({ type: 'SET_USER_PLANTS', payload: userPlants });
  } catch (error) {
    console.log('User plants get request failed', error);
  }
}



function* userPlantsSaga() {
  yield takeLatest('FETCH_USER_PLANTS', fetchUserPlants);
}

export default userPlantsSaga;