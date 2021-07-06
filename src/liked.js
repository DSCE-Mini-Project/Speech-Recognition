import React, { useEffect } from "react";
import { useDataLayerValue } from "./DataLayer";
import { useRef, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./liked.css";
import { auth, db } from "./firebase";
function Liked() {
  const [{ uid }, dispatch] = useDataLayerValue();
  const [value, setValue] = useState("music");
  const [favvideos, setFavvideos] = useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    db.collection("favourite")
      .doc(uid)
      .collection(value)
      .onSnapshot((snapshot) =>
        setFavvideos(snapshot.docs.map((doc) => doc.data()))
      );
  }, [value]);
  return (
    <div className="liked">
      <div className="radio">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className="radio_buttons"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="music" control={<Radio />} label="music" />
          <FormControlLabel value="video" control={<Radio />} label="video" />
        </RadioGroup>
      </div>
      <div className="liked_items">
        {value == "video"
          ? favvideos.map(({ id, channeltitle, duration, title, url }) => (
              <VideoTile
                id={id}
                channeltitle={channeltitle}
                duration={duration}
                title={title}
                url={url}
              ></VideoTile>
            ))
          : favvideos.map(({ id, channeltitle, duration, title, url }) => (
              <MusicTile
                id={id}
                channeltitle={channeltitle}
                duration={duration}
                title={title}
                url={url}
              ></MusicTile>
            ))}
      </div>
    </div>
  );
}

export default Liked;

function VideoTile({ id, channeltitle, duration, title, url }) {
  return (
    <div className="video_tile" onClick={() => console.log(id)}>
      <img className="videocard_thumbnail" src={url}></img>

      <div className="videoCard_info">
        <h4>{title}</h4>
        <p>{channeltitle}</p>
        <p>{duration}</p>
      </div>
    </div>
  );
}

function MusicTile({ id, channeltitle, duration, title, url }) {
  console.log(title);
  return (
    <div className="music_tile" onClick={() => console.log(id)}>
      <div className="musicCard_left">
        <img className="musiccard_thumbnail" src={url}></img>
      </div>
      <div className="musicCard_info">
        <h4>{title}</h4>
        <p>{channeltitle}</p>
        
      </div>
      <div className="musicCard_right">
        <p>{duration}</p>
      </div>
    </div>
  );
}
