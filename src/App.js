import './App.css';
import Speech_recognition from './speech-recognition';
import Youtubeapi from './youtubeapi';
import React from 'react'
import Button from '@material-ui/core/Button';
import { useRef, useState } from "react";
function App() {
  
  return (<div className='speech_recognition'>
    <Speech_recognition />
    {/* <Youtubeapi /> */}
  </div>);
}

export default App;
