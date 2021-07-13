import React, { useEffect } from "react";
import { useRef, useState } from "react";
import "./header.css";
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import Mic from "@material-ui/icons/Mic";
import response from "./response";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import API_key from "./keys";
import MicOffIcon from '@material-ui/icons/MicOff';
import {useDataLayerValue} from './DataLayer';
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
function Header() {
  const[{uid},dispatch]=useDataLayerValue();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [mic,setMic]=useState(false);
  const commands = [
    {
      command: "google * video",
      callback: (sng) => {
        search(sng,false);
        // setIsAudio(false);
      },
    },
    {
      command: "google * audio",
      callback: (sng) => {
        // setIsAudio(true);
        search(sng,true);
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
    setMic(true)
    setIsListening(true);
    //microphoneRef.current.classList.add("listening");
    console.log('started')
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setMic(false)
    setIsListening(false);
    //microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  const search = (song,audio) => {
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
          type:"SET_ID",
          id:data["items"][0]["id"]["videoId"],
        }); dispatch({
          type:"SET_TITLE",
          title:data["items"][0]["snippet"]["title"],
        });dispatch({
          type:"SET_ARTIST",
          artist:data["items"][0]["snippet"]["channelTitle"],
        })
        dispatch({
          type:"SET_CONTENT_TYPE",
          isaudio:audio,
        })
        dispatch({
          type:"SET_THUMBNAIL",
          thumbnail:data["items"][0]["snippet"]["thumbnails"]["high"]["url"],
        })
        // setid(data["items"][0]["id"]["videoId"]);
        // setTitle(data["items"][0]["snippet"]["title"]);
        // setArtist(data["items"][0]["snippet"]["channelTitle"]);
        // setthumbnail(data["items"][0]["snippet"]["thumbnails"]["high"]["url"]);
      });
    // setid(response["items"][7]["id"]["videoId"]);
    // setTitle(response["items"][7]["snippet"]["title"]);
    // setArtist(response["items"][7]["snippet"]["channelTitle"]);
    // setthumbnail(response["items"][7]["snippet"]["thumbnails"]["high"]["url"]);
   
     console.log(song);
    
  };

  return (
    <div className="header">
      <div className="header_left">
        <img className='website_logo' src='https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1934&q=80' alt=' Logo'></img>
        <p>Rythm</p>
      </div>
      <div className="header_center">
        <div className='search_bar'>
            <SearchIcon className='search_icon'></SearchIcon>
            <input type='text' className='search_text' placeholder='Search for songs,videos and ...'></input>
        </div>
        {mic?<Mic onClick={stopHandle}></Mic>:<MicOffIcon onClick={handleListing}></MicOffIcon>}
        
      </div>
      <div className="header_right">
        
        <h5>Username</h5>
      <img className='profile_pic' src='https://images.unsplash.com/photo-1624916889482-f94b10311333?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80' alt=' Profile pic'></img>
      <img className='emotion' src='https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' alt=' Profile pic'></img>
      </div>
    </div>
  );
}

export default Header;
