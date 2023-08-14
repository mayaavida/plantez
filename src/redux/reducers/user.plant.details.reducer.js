function userPlantDetailsReducer(state = {}, action) {
    if(action.type === 'SET_USER_PLANT_DETAILS') {
        return action.payload
    }
    return state;
}

export default userPlantDetailsReducer;