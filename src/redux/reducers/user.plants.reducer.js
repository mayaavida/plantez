function userPlantsReducer(state = [], action) {
    if(action.type === 'SET_USER_PLANTS') {
        return action.payload
    }
    return state;
}

export default userPlantsReducer;