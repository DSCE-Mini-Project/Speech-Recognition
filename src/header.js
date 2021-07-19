import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import Mic from "@material-ui/icons/Mic";
import response from "./response";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import API_key from "./keys";
import MicOffIcon from "@material-ui/icons/MicOff";
import { useDataLayerValue } from "./DataLayer";
import { auth, db, storage } from "./firebase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import FlareComponent from 'flare-react';
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Header() {
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    db.collection("profile")
      .doc(uid)
      .get()
      .then((snapshot) => setUserdata(snapshot.data()))
      .catch((e) => console.log(e));
      // getemotion();
  }, [userdata]);
  const [{ uid,id,title,artist,thumbnail }, dispatch] = useDataLayerValue();
  const [isListening, setIsListening] = useState(true);
  // const microphoneRef = useRef(null);
  const [mic, setMic] = useState(true);
  const [searchkey, setSearchkey] = useState("");
  const [emotion, setEmotion] = useState("happy");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [upadtedname, setUpdatedname] = useState("");
  const [image, setImage] = useState("");
  const [previewimg, setPreview] = useState("");
  var emotion_emoji = { happy: "😄", angry: "😡", sad: "🙁", calm: "🙂" };
  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = React.useState(false);

  const editprofile = () => {
    setOpen(true);
  };

  const cancel = () => {
    setOpen(false);
  };
  const updateprofile = () => {
    if(image !=''){
    storage
      .ref(`/profile/${uid}`)
      .put(image)
      .on("state_changed", alert("profile updated"), alert, () => {
        storage
          .ref("profile")
          .child(uid)
          .getDownloadURL()
          .then((url) => {
            db.collection("profile")
              .doc(uid)
              .update({ username: upadtedname, url: url });
          });
      });
      
    }
    else{
      db.collection("profile")
      .doc(uid)
      .update({ username: upadtedname });
    }
    setOpen(false);
  };
  const commands = [
    {
      command: "rhythm * video",
      callback: (sng) => {
        search(sng, false);
        // setIsAudio(false);
      },
    },
    {
      command: "rhythm * audio",
      callback: (sng) => {
        // setIsAudio(true);
        search(sng, true);
      },
    },
    {
      command: "rhythm pause",
      callback: () => 
        dispatch({
          type: "SET_PLAYING",
          playing: false,
        })
      
    },
    {
      command: "rhythm play",
      callback: () => 
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        })
      
    },
    {
      command: "rhythm set volume *",
      callback: (vol) => 
        dispatch({
          type: "SET_VOLUME",
          volume: vol,
        })
      
    },
    {
      command: "rhythm add to playlist",
      callback: () => 
      db.collection('playlist')
      .doc(uid)
      .collection("music")
      .add({
        channeltitle: artist,
        id: id,
        duration: "5:30",
        title: title,
        url: thumbnail,
      })
      
    },
    {
      command: "rhythm search *",
      callback: (key) => 
        setkeyword(key)
      
      
    },
    {
      command: "rhythm add to queue",
      callback: () => 
      db.collection('queue')
      .doc(uid)
      .collection("music")
      .add({
        channeltitle: artist,
        id: id,
        duration: "5:30",
        title: title,
        url: thumbnail,
      })
      
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  if (
    !SpeechRecognition.browserSupportsSpeechRecognition({ continuous: true })
  ) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const handleListing = () => {
    setMic(true);
    setIsListening(true);
    //microphoneRef.current.classList.add("listening");
    console.log("started");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setMic(false);
    setIsListening(false);
    //microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  function setkeyword(key) {
    dispatch({
      type: "SET_OPTION",
      option: 6,
    });
    dispatch({
      type: "SET_KEYWORD",
      keyword: key,
    });
  }
  const search = (song, audio) => {
    // setid("");
    const apiUrl =
      "https://www.googleapis.com/youtube/v3/search?key=" +
      API_key +
      "&q=" +
      song +
      "&part=snippet,id&maxResults=20";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_ID",
          id: data["items"][0]["id"]["videoId"],
        });
        dispatch({
          type: "SET_TITLE",
          title: data["items"][0]["snippet"]["title"],
        });
        dispatch({
          type: "SET_ARTIST",
          artist: data["items"][0]["snippet"]["channelTitle"],
        });
        dispatch({
          type: "SET_CONTENT_TYPE",
          isaudio: audio,
        });
        dispatch({
          type: "SET_THUMBNAIL",
          thumbnail: data["items"][0]["snippet"]["thumbnails"]["high"]["url"],
        });
      });
  };
  function getemotion() {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => setEmotion(data.result));
  }
  return (
    <div className="header">
      <div className="header_left">
      <FlareComponent width={60} height={60} animationName='headphones'  transparent={true} file="headphones.flr" className='website_logo'/>
        <p>Rythm</p>
      </div>
      <div className="header_center">
        <div className="search_bar">
          <SearchIcon className="search_icon"></SearchIcon>
          <input
            type="text"
            className="search_text"
            placeholder="Search for songs,videos and ..."
            onKeyPress={(e) => e.key === "Enter" && setkeyword(searchkey)}
            onChange={(e) => setSearchkey(e.target.value)}
          ></input>
        </div>
        {mic ? (
          <Mic onClick={stopHandle} className="mic"></Mic>
        ) : (
          <MicOffIcon onClick={handleListing} className="mic"></MicOffIcon>
        )}
      </div>
      <div className="header_right">
        <img
          className="profile_pic"
          src={userdata.url}
          alt=" Profile pic"
          onClick={handleClick}
        ></img>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem
            onClick={() => {
              handleClose();
              editprofile();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </StyledMenuItem>
        </StyledMenu>
        <Dialog
          open={open}
          onClose={cancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
          <DialogContent>
            <div className="update_image">
              <Button
                variant="contained"
                component="label"
                style={{ borderRadius: 50 }}
                className="image_select"
              >
                {image != "" ? (
                  <img src={previewimg} className="updateimg"></img>
                ) : (
                  <img src={userdata.url} className="updateimg"></img>
                )}

                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                    setImage(e.target.files[0]);
                  }}
                />
              </Button>
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
              onChange={(e) => setUpdatedname(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={cancel} color="primary">
              Cancel
            </Button>
            <Button onClick={updateprofile} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <h4>{userdata.username}</h4>
        <h1>{emotion_emoji[emotion]}</h1>
      </div>
    </div>
  );
}

export default Header;
