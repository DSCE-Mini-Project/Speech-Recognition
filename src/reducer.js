export const initialState = {
    uid: null,  
    playing: false,
    id: null,
    title:null,
    artist:null,
    thumbnail:null,
    isaudio:null,
    volume:30,
    queuenum:0,
    queuelen:0,
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
        case "SET_CONTENT_TYPE":
            return {
                ...state,
                isaudio:action.isaudio
            }
        case "SET_THUMBNAIL":
            return {
                ...state,
                thumbnail:action.thumbnail
            }
        case "SET_VOLUME":
            return {
                ...state,
                volume:action.volume
            }
        case "SET_QUEUENUM":
            return {
                ...state,
                queuenum:action.queuenum
            }
        case "SET_QUEUELEN":
            return {
                ...state,
                queuelen:action.queuelen
            }
        default:
            return state;
    }
}

export default reducer;