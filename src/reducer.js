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
        case "SET_TITLE":
            return {
                ...state,
                title:action.title
            }
        case "SET_ARTIST":
            return {
                ...state,
                artist:action.artist
            }
        case "SET_THUMBNAIL":
            return {
                ...state,
                thumbnail:action.thumbnail
            }
        default:
            return state;
    }
}

export default reducer;