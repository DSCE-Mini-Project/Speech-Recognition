import React from 'react'
import './youtubeapi.css'
import { useRef, useState } from "react";
import Button from '@material-ui/core/Button';
function Youtubeapi() {
    const [firstName, setFirstName] = useState('');
    const componentDidMount=()=> {
        const apiUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyA_-pgGuPTYypNGox45JMcC0u86u87Tu8I&q=play date&part=snippet,id&order=date&maxResults=20';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => console.log('This is your data', data));
      }
    return (
        <div className='youtube'>
            <input type='text' className='youtube_search' onChange={e => setFirstName(e.target.value)}></input>
            <p className='text'>{firstName}</p>
            <Button variant="contained" color="primary" onClick={componentDidMount} className='youtube_button'>Search</Button>
        </div>
    )
}

export default Youtubeapi
