import React, { useEffect } from 'react'
import { useRef, useState } from "react";
import './speech_recognition.css';
import YouTube from 'react-youtube';
import Button from '@material-ui/core/Button';
import response from './response';
import API_key from './keys';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import MicIcon from '@material-ui/icons/Mic';
function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}
function Speech_recognition( ) {
  const [song,setSong]=useState('');
  useEffect(() => {
    handleListing();
   
  }, []);
 
 
    const [isListening, setIsListening] = useState(false);
    const [isaudio, setIsAudio] = useState(false);
    const [id, setid] = useState('');
    const [thumbnail, setthumbnail] = useState('');
    const microphoneRef = useRef(null);
    const commands = [
      { 
        command: 'google * video',
        callback : (sng)=> { 
           search(sng);
           setIsAudio(false);
      } 
      },
      { 
        command: 'google * audio',
        callback : (sng)=> { 
          setIsAudio(true);
           search(sng);
      } 
      },
      {
        command: 'clear',
        callback: async({ resetTranscript }) => {
          handleReset();
          await timeout(1000);
          handleListing();}
      }
    ]
     
    const { transcript, resetTranscript } = useSpeechRecognition({commands});
    if (!SpeechRecognition.browserSupportsSpeechRecognition({ continuous: true })) {
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
    const search=(song)=> {
          setid('');
        //  const apiUrl = 'https://www.googleapis.com/youtube/v3/search?key='+API_key+'&q='+song+'&part=snippet,id&maxResults=20';
        //   fetch(apiUrl)
        //     .then((response) => response.json())
        //     .then((data) =>{setid(data['items'][0]['id']['videoId']);setthumbnail(data['items'][0]['snippet']['thumbnails']['high']['url']);
        //   });
            setid(response['items'][0]['id']['videoId']);
           setthumbnail(response['items'][0]['snippet']['thumbnails']['high']['url'])
          console.log(song);
        }
        const opts = {
          height: '350',
          width: '450 ',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            modestbranding:1,
          },
        };
        const music_opts = {
          height: '0',
          width: '0 ',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            modestbranding:1,
          },
        };
      
    return (
      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListing}
          >
            <MicIcon  className="microphone-icon" />
          </div>
          <div className="microphone-status">
            {isListening ? "Listening........." : "Click to start Listening"}
          </div>
          {isListening && (
            <button className="microphone-stop btn" onClick={stopHandle}>
              Stop
            </button>
          )}
        </div>
        {transcript && (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            <button className="microphone-reset btn" onClick={handleReset}>
              Reset
            </button>
            {/* <Button variant="contained" color="primary" onClick={search} className='microphone-reset btn'>Search</Button> */}
          
          </div>
        )}

      {(id!='' & isaudio==false) ?
       (<div className='youtube_player'>
         <YouTube className='youtube_player' videoId={id} opts={opts} onReady={e=>e.target.playVideo()}/>
         </div>):
          <div></div>
         }
       {(id!='' & isaudio==true) ?(<div className='youtube_player'>
          <YouTube className='youtube_player' videoId={id} opts={music_opts} onReady={e=>e.target.playVideo()}/>
          <img src={thumbnail} height='360' width='480'></img>
          </div>):<div></div>}
         
      </div>
    );
}

export default Speech_recognition
