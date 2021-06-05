import React from 'react'
import './youtubeapi.css'
import YouTube from 'react-youtube';
import { useRef, useState } from "react";
import Button from '@material-ui/core/Button';

function Youtubeapi({id}) {
  const YoutubeMusicApi = require('youtube-music-api')
  const search=()=> {
    const api = new YoutubeMusicApi();
    api.initalize() // Retrieves Innertube Config
    .then((info) => api.search("ne deve ne kush", "song").then(result => console.log(result)) )}
    return (
        <div className='youtube'>
             <Button variant="contained" color="primary" onClick={search} className='microphone-reset btn'>Search</Button>
        </div>
    )
}

export default Youtubeapi
