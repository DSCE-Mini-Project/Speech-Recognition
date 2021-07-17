import React, { useEffect } from "react";
import { useRef, useState } from "react";
import "./speech_recognition.css";
import YouTube from "react-youtube";
import Button from "@material-ui/core/Button";
import response from "./response";
import API_key from "./keys";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@material-ui/icons/Mic";
import Footer from "./Footer";
import ReactPlayer from "react-player";
import Header from "./header";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import YouTubeIcon from "@material-ui/icons/YouTube";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import QueueIcon from "@material-ui/icons/Queue";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import Music from "./music";
import Video from "./video";
import Liked from "./liked";
import Playlist from "./playlist";
import Queue from "./queue";
import { useDataLayerValue } from "./DataLayer";
import Footer_video from "./footer_video";
import Search from "./search";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
function Speech_recognition() {
  const [song, setSong] = useState("");
  const [{ uid, id, title, artist, isaudio, thumbnail,option }, dispatch] =
    useDataLayerValue();
  useEffect(() => {
    // handleListing();
    //console.log(id);
    //search();
  }, [id, isaudio]);

  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);


  return (
    <div className="home">
      <div className="home_header">
        <Header></Header>
      </div>
      <div className="home_center">
        <div className="home_center_left">
          <div
            className="option"
            onClick={() =>
              dispatch({
                type: "SET_OPTION",
                option: 1,
              })
            }
          >
            <MusicNoteIcon />
            <p className="title">Music</p>
          </div>
          <div
            className="option"
            onClick={() =>
              dispatch({
                type: "SET_OPTION",
                option: 2,
              })
            }
          >
            <YouTubeIcon />
            <p className="title">Videos</p>
          </div>
          <div
            className="option"
            onClick={() =>
              dispatch({
                type: "SET_OPTION",
                option: 3,
              })
            }
          >
            <ThumbUpAltIcon />
            <p className="title">Favourites</p>
          </div>
          <div
            className="option"
            onClick={() =>
              dispatch({
                type: "SET_OPTION",
                option: 4,
              })
            }
          >
            <PlaylistPlayIcon />
            <p className="title">Playlist</p>
          </div>
          <div
            className="option"
            onClick={() =>
              dispatch({
                type: "SET_OPTION",
                option: 5,
              })
            }
          >
            <QueueIcon />
            <p className="title">Queue</p>
          </div>
        </div>
        <div className="home_center_right">
          {option == 1 ? <Music /> : <div />}
          {option == 2 ? <Video /> : <div />}
          {option == 3 ? <Liked /> : <div />}
          {option == 4 ? <Playlist /> : <div />}
          {option == 5 ? <Queue /> : <div />}
          {option == 6 ? <Search /> : <div />}
        </div>
      </div>

      {isaudio == false && id != null ? (
        <Footer_video id={id} title={title} artist={artist}></Footer_video>
      ) : (
        <Footer
          className="music_player"
          thumbnail={thumbnail}
          id={id}
          title={title}
          artist={artist}
        ></Footer>
      )}
    </div>
  );
}

export default Speech_recognition;
