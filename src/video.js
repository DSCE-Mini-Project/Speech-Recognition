import React, { useEffect } from "react";
import { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import videos_response from './videos_response';
import Avatar from '@material-ui/core/Avatar';
import './video.css'
function Video() {
  const [videos,setVideos]=useState([])
  // useEffect(() => {
  //   getvideos();
  //   }, []);
  const getvideos=()=>{
    // const apiurl='https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=AIzaSyA_-pgGuPTYypNGox45JMcC0u86u87Tu8I&maxResults=100';
    // fetch(apiurl)
    // .then((response) => response.json())
    // .then((data)=>console.log(data))
    // .catch((error)=>console.log(error))
    
  
  }
    return (
        <div className="video">
          {videos_response.items.map((item)=><VideoTile item={item}></VideoTile>)}
          
        </div>
    )
}

export default Video


function VideoTile({item}) {
  return (
    <div className='video__tile'>
     
      <img className='videocard__thumbnail' src={item.snippet.thumbnails.high.url}></img>
      
      <div className='videoCard__info'>
      <h4>{item.snippet.title}</h4>
      <p>{item.snippet.channelTitle}</p>
      <p>{item.snippet.publishedAt}</p>
      </div>
    
    </div>
  )
}

