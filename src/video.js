import React, { useEffect } from "react";
import { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import response_video from './response_video';
import Avatar from '@material-ui/core/Avatar';
import {useDataLayerValue} from './DataLayer';
import './video.css'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { auth,db } from "./firebase";
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
          {response_video.items.map((item)=><VideoTile item={item} ></VideoTile>)}
          
        </div>
    )
}

export default Video


function VideoTile({item}) {
  const[{uid},dispatch]=useDataLayerValue();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = (option) => {
  console.log(option);
  db.collection(option).doc(uid).collection('video').add({'channeltitle':item.snippet.channelTitle,'id':item.id,'duration':'5:30','title':item.snippet.title,'url':item.snippet.thumbnails.high.url})
  setAnchorEl(null);

};
const options = [
  'favourite',
  'playlist',
  'queue',
];
    const setvalues=()=>{
      dispatch({
        type:"SET_ID",
        id:item.id,
      }); dispatch({
        type:"SET_TITLE",
        title:item.snippet.title,
      });dispatch({
        type:"SET_ARTIST",
        artist:item.snippet.channelTitle,
      })
      dispatch({
        type:"SET_CONTENT_TYPE",
        isaudio:false,
      })
    }
  return (
    <div className='video__tile' onClick={()=>{setvalues()}}>
     
      <img className='videocard__thumbnail' src={item.snippet.thumbnails.high.url}></img>
      
      <div className='videoCard__info'>
      <h4>{item.snippet.title}</h4>
      <p>{item.snippet.channelTitle}</p>
      <div className='videocard_option'>
      <p>{item.snippet.publishedAt}</p>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        className='icon_button'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 200 * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Playlist'} onClick={()=>handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      </div>
      </div>
    
    </div>
  )
}

