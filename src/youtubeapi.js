import React from 'react'
import './youtubeapi.css'
import YouTube from 'react-youtube';
import { useRef, useState } from "react";
import Button from '@material-ui/core/Button';

function Youtubeapi() {
  const [id, setid] = useState('');
  const search=()=> {
    const apiurl='http://127.0.0.1:5000/'
    fetch(apiurl)
            .then((response) => response.json()
           )
            .then((data) =>{
              console.log(data['result']);
          });
    }
    return (
        <div className='youtube'>
             <Button variant="contained" color="primary" onClick={search} className='microphone-reset btn'>Search</Button>
        </div>
    )
}

export default Youtubeapi
