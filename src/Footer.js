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
import './Footer.css'
import ReactPlayer from 'react-player'
function Footer({thumbnail,id}) {
    const [playing, setPlaying] = useState(true);
    const toggle_playing =()=>{
        if(playing==true){
            setPlaying(false);
        }else{
            setPlaying(true);
        }
    }
    return (
        <div className='footer'>
        <div className="footer__left">
            <img className="footer__albumLogo" src={thumbnail} alt=''></img>
            <div className="footer__songInfo">
                <h4>Yeah!</h4>
                <p>Usher</p>
            </div>
            <ReactPlayer url={"https://www.youtube.com/watch?v="+id} className='youtube_player' height='0' width='0' playing={playing}/>
            {/* <YouTube
            className="youtube_player"
            videoId={id}
            opts={opts}
            onReady={(e) => e.target.playVideo()}
          />  */}
        </div>
        <div className="footer__center">
            <ShuffleIcon className="footer__green" />
            <SkipPreviousIcon className="footer__icon" />
            <PlayCircleOutlineIcon fontSize="large" onClick={toggle_playing} classname="footer__icon" />
            <SkipNextIcon className="footer__icon" />
            <RepeatIcon className="footer__green" />

        </div>
        <div className="footer__right">
            <Grid container spacing={2}>
                <Grid item>
                    <PlaylistPlayIcon />
                </Grid>
                <Grid item>
                    <VolumeDownIcon />
                </Grid>
                <Grid item xs>
                    <Slider />
                </Grid>
            </Grid>
        </div>
    </div>
    )
}

export default Footer


