import React, { useEffect } from "react";
import { useRef, useState } from "react";
import "./music.css";
import response_music from "./response_music";
import { useDataLayerValue } from "./DataLayer";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { auth, db } from "./firebase";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const apiUrl ="https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=10&key=AIzaSyA_-pgGuPTYypNGox45JMcC0u86u87Tu8I&maxResults=30"  

function Music() {
   var [data,setData]=useState([]);
  useEffect(() => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((body)=>setData(body.items.map((item)=>{return item})))
    
  }, [])

 
  return (
    <div className="music">
      {data.map((item) => (
        <MusicTile item={item} />
      ))}
    </div>
  );
}

export default Music;

function MusicTile({ item }) {
  const [{ uid }, dispatch] = useDataLayerValue();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [liked, setLiked] = React.useState(false);
  const open = Boolean(anchorEl);
  const addtoliked = () => {
    setLiked(true);
    db.collection("favourite")
      .doc(uid)
      .collection("music")
      .add({
        channeltitle: item.snippet.channelTitle,
        id: item.id,
        duration: "5:30",
        title: item.snippet.title,
        url: item.snippet.thumbnails.high.url,
      });
  };
  const removefromliked = () => {
    setLiked(false);
    var jobskill_query = db
      .collection("favourite")
      .doc(uid)
      .collection("music")
      .where("id", "==", item.id);
    jobskill_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
    console.log('deleted')
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    console.log(option);
    db.collection(option)
      .doc(uid)
      .collection("music")
      .add({
        channeltitle: item.snippet.channelTitle,
        id: item.id,
        duration: "5:30",
        title: item.snippet.title,
        url: item.snippet.thumbnails.high.url,
      });
    setAnchorEl(null);
  };
  const options = ["playlist", "queue"];
  const setvalues = () => {
    dispatch({
      type: "SET_ID",
      id: item.id,
    });
    dispatch({
      type: "SET_TITLE",
      title: item.snippet.title,
    });
    dispatch({
      type: "SET_ARTIST",
      artist: item.snippet.channelTitle,
    });
    dispatch({
      type: "SET_CONTENT_TYPE",
      isaudio: true,
    });
    dispatch({
      type: "SET_THUMBNAIL",
      thumbnail: item.snippet.thumbnails.high.url,
    });
  };
  return (
    <div
      className="music__tile"
      onClick={() => {
        setvalues();
      }}
    >
      <div className="musicCard__left">
        <img
          className="musiccard__thumbnail"
          src={item.snippet.thumbnails.high.url}
        ></img>
      </div>
      <div className="musicCard__info">
        <h4 className="musiccard_title">{item.snippet.title.split("|")[0]}</h4>
        <p>{item.snippet.channelTitle}</p>
      </div>
      <div className="musicCard__right">
        {liked ? (
          <FavoriteIcon className="fav_icon" onClick={removefromliked} />
        ) : (
          <FavoriteBorderIcon onClick={addtoliked} />
        )}

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          className="icon_button"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 200 * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Playlist"}
              onClick={() => handleClose(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}
