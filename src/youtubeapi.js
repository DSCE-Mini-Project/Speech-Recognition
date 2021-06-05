import React from 'react'
import './youtubeapi.css'
import YouTube from 'react-youtube';
import { useRef, useState } from "react";
import Button from '@material-ui/core/Button';

function Youtubeapi({id}) {
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          modestbranding:1,
        },
      };
    return (
        <div className='youtube'>
            {id &&(<YouTube className='youtube_player' videoId={id} opts={opts} onReady={e=>e.target.playVideo() }/>)}
        </div>
    )
}

export default Youtubeapi
