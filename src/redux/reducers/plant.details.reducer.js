function plantDetailsReducer(state = {}, action) {
    if(action.type === 'SET_PLANT_DETAILS') {
        return action.payload
    }
    return state;
}

export default plantDetailsReducer;