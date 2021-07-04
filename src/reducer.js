export const initialState = {
    uid: null,  
    playing: false,
};
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_UID":
            return {
                ...state,
                uid: action.uid
            };
        default:
            return state;
    }
}

export default reducer;