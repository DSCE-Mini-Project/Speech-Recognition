import React, { useEffect } from "react";
import { useDataLayerValue } from "./DataLayer";
import { useRef, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./playlist.css";
import { auth, db } from "./firebase";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
function Playlist() {
  const [{ uid }, dispatch] = useDataLayerValue();
  const [value, setValue] = useState("music");
  const [favvideos, setFavvideos] = useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    db.collection("playlist")
      .doc(uid)
      .collection(value)
      .onSnapshot((snapshot) =>
        setFavvideos(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            data.did = doc.id;
            return data;
          })
        )
      );
   
  }, [value]);
  return (
    <div className="playlist">
      <div className="radio">
        <RadioGroup
          aria-label="type"
          name="type"
          className="radio_buttons"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="music" control={<Radio />} label="music" />
          <FormControlLabel value="video" control={<Radio />} label="video" />
        </RadioGroup>
      </div>
      <div className="playlist_items">
        {value == "video"
          ? favvideos.map(({ id, channeltitle, duration, title, url,did }) => (
              <VideoTile
                id={id}
                channeltitle={channeltitle}
                duration={duration}
                title={title}
                url={url}
                did={did}
              ></VideoTile>
            ))
          : favvideos.map(({ id, channeltitle, duration, title, url,did }) => (
              <MusicTile
                id={id}
                channeltitle={channeltitle}
                duration={duration}
                title={title}
                url={url}
                did={did}
              ></MusicTile>
            ))}
      </div>
    </div>
  );
}

export default Playlist;

function VideoTile({ id, channeltitle, duration, title, url,did }) {
  const [{uid}, dispatch] = useDataLayerValue();
  const setvalues = () => {
    dispatch({
      type: "SET_ID",
      id: id,
    });
    dispatch({
      type: "SET_TITLE",
      title: title,
    });
    dispatch({
      type: "SET_ARTIST",
      artist: channeltitle,
    });
    dispatch({
      type: "SET_THUMBNAIL",
      thumbnail: url,
    });
    dispatch({
      type: "SET_CONTENT_TYPE",
      isaudio: false,
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    console.log(option);
    db.collection('playlist').doc(uid).collection('video').doc(did).delete().then(()=>{
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
  });
    setAnchorEl(null);
  };
  const options = ["Remove"];
  return (
    <div
      className="video_tile"
      onClick={() => {
        setvalues();
      }}
    >
      <img className="videocard_thumbnail" src={url}></img>

      <div className="videoCard_info">
        <h4>{title}</h4>
        <p>{channeltitle}</p>
      <div className='video_option'>
      <p>{duration}</p>
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
    </div>
  );
}

function MusicTile({ id, channeltitle, duration, title, url,did }) {
  const [{uid}, dispatch] = useDataLayerValue();
  const setvalues = () => {
    dispatch({
      type: "SET_ID",
      id: id,
    });
    dispatch({
      type: "SET_TITLE",
      title: title,
    });
    dispatch({
      type: "SET_ARTIST",
      artist: channeltitle,
    });
    dispatch({
      type: "SET_THUMBNAIL",
      thumbnail: url,
    });
    dispatch({
      type: "SET_CONTENT_TYPE",
      isaudio: true,
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    console.log(option);
    db.collection('playlist').doc(uid).collection('music').doc(did).delete().then(()=>{
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
  });
    setAnchorEl(null);
  };
  const options = ["Remove"];
  return (
    <div
      className="music__tile"
      onClick={() => {
        setvalues();
      }}
    >
      <div className="musicCard__left">
        <img className="musiccard__thumbnail" src={url}></img>
      </div>
      <div className="musicCard__info">
        <h4 className="musiccard__title">{title}</h4>
        <p>{channeltitle}</p>
      </div>
      <div className="musicCard__right">
        <p>{duration}</p>
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
