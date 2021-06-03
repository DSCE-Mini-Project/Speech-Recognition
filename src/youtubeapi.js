import React from 'react'
import './youtubeapi.css'
import { useRef, useState } from "react";
function Youtubeapi() {
    const [firstName, setFirstName] = useState('');
   var text=' ';
    return (
        <div className='youtube'>
            <input type='text' className='youtube_search' onChange={e => setFirstName(e.target.value)}></input>
            
            <p className='text'>{firstName}</p>
        </div>
    )
}

export default Youtubeapi
