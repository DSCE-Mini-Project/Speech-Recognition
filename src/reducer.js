export const initialState = {
  uid: null,
  playing: false,
  id: null,
  title: null,
  artist: null,
  thumbnail: null,
  isaudio: null,
  volume: 30,
  queuenum: 0,
  queuelen: 0,
  option: 1,
  keyword: null,
  playing:true,
};
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_UID":
      return {
        ...state,
        uid: action.uid,
      };
    case "SET_ID":
      return {
        ...state,
        id: action.id,
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.title,
      };
    case "SET_ARTIST":
      return {
        ...state,
        artist: action.artist,
      };
    case "SET_THUMBNAIL":
      return {
        ...state,
        thumbnail: action.thumbnail,
      };
    case "SET_CONTENT_TYPE":
      return {
        ...state,
        isaudio: action.isaudio,
      };
    case "SET_THUMBNAIL":
      return {
        ...state,
        thumbnail: action.thumbnail,
      };
    case "SET_VOLUME":
      return {
        ...state,
        volume: action.volume,
      };
    case "SET_QUEUENUM":
      return {
        ...state,
        queuenum: action.queuenum,
      };
    case "SET_QUEUELEN":
      return {
        ...state,
        queuelen: action.queuelen,
      };
    case "SET_OPTION":
      return {
        ...state,
        option: action.option,
      };
    case "SET_KEYWORD":
      return {
        ...state,
        keyword: action.keyword,
      };
      case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    default:
      return state;
  }
};

export default reducer;
