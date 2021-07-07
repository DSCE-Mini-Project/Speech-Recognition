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
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
function Speech_recognition() {
  const [song, setSong] = useState("");
  const [{ uid, id, title, artist, isaudio,thumbnail}, dispatch] = useDataLayerValue();
  useEffect(() => {
    // handleListing();
    console.log(id);
    search();
  }, [id,isaudio]);

  const [isListening, setIsListening] = useState(false);
  // const [isaudio, setIsAudio] = useState(false);
  // const [id, setid] = useState("");
  // const [title, setTitle] = useState("");
  // const [artist, setArtist] = useState("");
  // const [thumbnail, setthumbnail] = useState("");
  const [option, setOption] = useState("1");
  const microphoneRef = useRef(null);
  const commands = [
    {
      command: "google * video",
      callback: (sng) => {
        search(sng);
        // setIsAudio(false);
      },
    },
    {
      command: "google * audio",
      callback: (sng) => {
        // setIsAudio(true);
        search(sng);
      },
    },
    {
      command: "clear",
      callback: async ({ resetTranscript }) => {
        handleReset();
        await timeout(1000);
        handleListing();
      },
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
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  const search = (song) => {
    // setid("");
    const apiUrl =
      "https://www.googleapis.com/youtube/v3/search?key=" +
      API_key +
      "&q=" +
      song +
      "&part=snippet,id&maxResults=20";
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setid(data["items"][0]["id"]["videoId"]);
    //     setTitle(data["items"][0]["snippet"]["title"]);
    //     setArtist(data["items"][0]["snippet"]["channelTitle"]);
    //     setthumbnail(data["items"][0]["snippet"]["thumbnails"]["high"]["url"]);
    //   });
    // setid(response["items"][7]["id"]["videoId"]);
    // setTitle(response["items"][7]["snippet"]["title"]);
    // setArtist(response["items"][7]["snippet"]["channelTitle"]);
    // setthumbnail(response["items"][7]["snippet"]["thumbnails"]["high"]["url"]);
    // console.log(song);
  };

  return (
    <div className="home">
      <div className="home_header">
        <Header></Header>
      </div>
      <div className="home_center">
        <div className="home_center_left">
          <div className="option" onClick={() => setOption(1)}>
            <MusicNoteIcon />
            <p className="title">Music</p>
          </div>
          <div className="option" onClick={() => setOption(2)}>
            <YouTubeIcon />
            <p className="title">Videos</p>
          </div>
          <div className="option" onClick={() => setOption(3)}>
            <ThumbUpAltIcon />
            <p className="title">Liked Videos</p>
          </div>
          <div className="option" onClick={() => setOption(4)}>
            <PlaylistPlayIcon />
            <p className="title">Playlist</p>
          </div>
          <div className="option" onClick={() => setOption(5)}>
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
        </div>
      </div>

      
        {isaudio == false && id!=null? 
          <Footer_video id={id} title={title} artist={artist}></Footer_video>
         : 
          <Footer
            className="music_player"
            thumbnail={thumbnail}
            id={id}
            title={title}
            artist={artist}
          ></Footer>
        }
    </div>
  );
}

export default Speech_recognition;
