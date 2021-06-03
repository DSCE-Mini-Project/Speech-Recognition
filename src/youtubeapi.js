import React from 'react'
import './youtubeapi.css'
import { useRef, useState } from "react";
function Youtubeapi() {
   var text=' ';
    return (
        <div className='youtube'>
            <input type='text' className='youtube_search' onChange={(e) =>{text=e.target.value;console.log(text); }}></input>
            
            <p className='text'>{text}</p>
        </div>
    )
}

export default Youtubeapi
