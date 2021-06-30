import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import YouTube from "react-youtube";
import React from 'react'
import { useRef, useState } from "react";
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import './Footer.css'
import ReactPlayer from 'react-player'
function Footer({thumbnail,id}) {
    const [playing, setPlaying] = useState(true);
    const [loop,setLoop]=useState(false);
    const [volume,setVolume]=useState(30);
    const toggle_playing =()=>{
        if(playing==true){
            setPlaying(false);
        }else{
            setPlaying(true);
        }
    }
    const toggleloop=()=>{
        if(loop == false){
            setLoop(true);
        }
        else{
        setLoop(false);
    }
    }
    const volumechange = (event, newValue) => {
        setVolume(newValue);
      };
    return (
        <div className='footer'>
        <div className="footer__left">
            <img className="footer__albumLogo" src={thumbnail} alt=''></img>
            <div className="footer__songInfo">
                <h4>Yeah!</h4>
                <p>Usher</p>
            </div>
            <ReactPlayer url={"https://www.youtube.com/watch?v="+id} className='youtube_player' height='0' width='0' playing={playing} volume={volume/100} loop={loop}/>
            {/* <YouTube
            className="youtube_player"
            videoId={id}
            opts={opts}
            onReady={(e) => e.target.playVideo()}
          />  */}
        </div>
        <div className="footer__center"> 
            <SkipPreviousIcon className="footer__icon" />
            {playing?<PauseCircleOutlineIcon fontSize="large" onClick={toggle_playing}/>:<PlayCircleOutlineIcon fontSize="large" onClick={toggle_playing} classname="footer__icon" />}
            <SkipNextIcon className="footer__icon" />
            {loop==false?<RepeatIcon className="footer__black" onClick={toggleloop}/>:<RepeatIcon className="footer__blue" onClick={toggleloop}/>}

        </div>
        <div className="footer__right">
            <Grid container spacing={2}>
                
                <Grid item>
                    <VolumeDownIcon />
                </Grid>
                <Grid item xs>
                    <Slider aria-labelledby="continuous-slider"  onChange={volumechange} value={volume} />
                </Grid>
            </Grid>
        </div>
    </div>
    )
}

export default Footer


