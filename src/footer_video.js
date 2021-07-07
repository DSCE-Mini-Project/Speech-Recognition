import React from 'react'
import './footer_video.css'
import ReactPlayer from 'react-player'
function Footer_video({id,title,artist}) {
    return (
        <div className='footer_video'>
           <ReactPlayer url={"https://www.youtube.com/watch?v="+id} className='youtube_player'/> 
           <h5 className='video_title' numberOfLines={1}>{title}</h5> 
           <p className='artist'>{artist}</p>
        </div>
    )
}

export default Footer_video
