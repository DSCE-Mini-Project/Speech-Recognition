import React, { useEffect } from "react";
import { useDataLayerValue } from "./DataLayer";
import { useRef, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./queue.css";
import { auth, db } from "./firebase";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
function Queue() {
  const [{ uid,queuenum }, dispatch] = useDataLayerValue();
  const [value, setValue] = useState("music");
  const [favvideos, setFavvideos] = useState([]);
  const [songnum,setSongnum]=useState(0);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    db.collection("queue")
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
    dispatch({
      type:'SET_QUEUELEN',
      queuelen:favvideos.length,
    })
    console.log(favvideos.length);
    console.log(favvideos);
    if(queuenum!=0){
      playqueue()
    }
  }, [value,queuenum]);
  function playqueue() {
    dispatch({
      type: "SET_ID",
      id: favvideos[queuenum].id,
    });
    dispatch({
      type: "SET_TITLE",
      title: favvideos[queuenum].title,
    });
    dispatch({
      type: "SET_ARTIST",
      artist: favvideos[queuenum].channeltitle,
    });
    dispatch({
      type: "SET_THUMBNAIL",
      thumbnail: favvideos[queuenum ].url,
    });
    dispatch({
      type: "SET_CONTENT_TYPE",
      isaudio: true,
    });
  }
  return (
    <div className="queue">
      <div className="radio_options">
        <div className="play_button">
          <PlayCircleOutlineIcon style={{ fontSize: "40" }} onClick={playqueue} />
        </div>
        <div className="radio_buttons">
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
      </div>
      <div className="queue_items">
        {value == "video"
          ? favvideos.map(({ id, channeltitle, duration, title, url, did }) => (
              <VideoTile
                id={id}
                channeltitle={channeltitle}
                duration={duration}
                title={title}
                url={url}
                did={did}
              ></VideoTile>
            ))
          : favvideos.map(({ id, channeltitle, duration, title, url, did }) => (
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

export default Queue;

function VideoTile({ id, channeltitle, duration, title, url, did }) {
  const [{ uid }, dispatch] = useDataLayerValue();
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
    db.collection("queue")
      .doc(uid)
      .collection("video")
      .doc(did)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
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
        <div className="video_option">
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

function MusicTile({ id, channeltitle, duration, title, url, did }) {
  const [{ uid }, dispatch] = useDataLayerValue();
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
    db.collection("queue")
      .doc(uid)
      .collection("music")
      .doc(did)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    setAnchorEl(null);
  };
  const options = ["Remove"];
  return (
    <div
      className="music_tile"
      onClick={() => {
        setvalues();
      }}
    >
      <div className="musicCard_left">
        <img className="musiccard_thumbnail" src={url}></img>
      </div>
      <div className="musicCard_info">
        <h4>{title}</h4>
        <p>{channeltitle}</p>
      </div>
      <div className="musicCard_right">
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
