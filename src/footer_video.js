import React from 'react'
import './footer_video.css'
import ReactPlayer from 'react-player'
import { useDataLayerValue } from "./DataLayer";
function Footer_video({id,title,artist}) {
    const [{volume}, dispatch] = useDataLayerValue();
    return (
        <div className='footer_video'>
           <ReactPlayer url={"https://www.youtube.com/watch?v="+id} className='youtube_player' volume={volume}/> 
           <h5 className='video_title' numberOfLines={1}>{title}</h5> 
           <p className='artist'>{artist}</p>
        </div>
    )
}

export default Footer_video
