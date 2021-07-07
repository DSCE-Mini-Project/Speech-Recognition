export const initialState = {
    uid: null,  
    playing: false,
    id: null,
    title:null,
    artist:null,
    thumbnail:null,
    isaudio:null,
};
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_UID":
            return {
                ...state,
                uid: action.uid
            };
        case "SET_ID":
            return {
                ...state,
                id: action.id
            };    
        default:
            return state;
    }
}

export default reducer;