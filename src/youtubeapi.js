import React from 'react'
import './youtubeapi.css'
import YouTube from 'react-youtube';
import { useRef, useState } from "react";
import Button from '@material-ui/core/Button';
function Youtubeapi() {
    const [firstName, setFirstName] = useState('');
    const search=e=> { e.preventDefault();
    //    const apiUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyA_-pgGuPTYypNGox45JMcC0u86u87Tu8I&q=play date&part=snippet,id&maxResults=20';
    //     fetch(apiUrl)
    //       .then((response) => response.json())
    //       .then((data) => console.log('This is your data', data));
       
    //     console.log(firstName);
      }
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    return (
        <div className='youtube'>
            <input type='text' className='youtube_search' onChange={e => setFirstName(e.target.value)}></input>
          
            <Button variant="contained" color="primary" onClick={search} className='youtube_button'>Search</Button>
            <YouTube videoId="a2j1bA23FBQ" opts={opts} onReady={e=>e.target.pauseVideo()} />
        </div>
    )
}

export default Youtubeapi
