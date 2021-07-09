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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDataLayerValue } from "./DataLayer";
function Footer({thumbnail,id,title,artist}) {
    const [{volume}, dispatch] = useDataLayerValue();
    const [playing, setPlaying] = useState(true);
    const [loop,setLoop]=useState(false);
    // const [volume,setVolume]=useState(30);
    const [elapsed,setElapsed]=useState('0:00');
    const [duration,setDuration]=useState('0:00');
    const [duration_sec,setDurationsec]=useState(0);
    const [elapsed_sec,setElapsedsec]=useState(0);
    const [fav,setFav]=useState(false);
    const toggle_playing =()=>{
        if(playing==true){
            setPlaying(false);
        }else{
            setPlaying(true);
        }
    }
    const toggle_fav=()=>{
        if(fav==true){
            setFav(false);
        }else{
            setFav(true);
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
    const getduration=(dur)=>{
        var min=Math.floor(dur/60);
        var sec=dur-(min*60)
        setDuration(min+':'+sec);
        setDurationsec(Math.ceil(dur));
    }
    const playingtime=(tme)=>{
        var elapsedtime=Math.ceil(tme.playedSeconds);
        var min=Math.floor(elapsedtime/60);
        var sec=elapsedtime-(min*60);
        setElapsed(min+':'+sec);
        setElapsedsec(Math.ceil(tme.playedSeconds));
    }
   
    const volumechange = (event, newValue) => {
        dispatch({
        type:"SET_VOLUME",
        volume:newValue,
        })
        // setVolume(newValue);
      };
    return (
        <div className='footer'>
        <div className="footer__left">
            <img className="footer__albumLogo" src={thumbnail} alt=''></img>
            <div className="footer__songInfo">
                <h4 className='footer_title'>{title}</h4>
                <p>{artist}</p>
            </div>
            <ReactPlayer url={"https://www.youtube.com/watch?v="+id} className='youtube_player' height='0' width='0' onDuration={getduration} playing={playing} onReady={getduration} volume={volume/100} loop={loop} onProgress={playingtime}/>
            {/* <YouTube
            className="youtube_player"
            videoId={id}
            opts={opts}
            onReady={(e) => e.target.playVideo()}
          />  */} 
          <div className='control_icons'>
          <SkipPreviousIcon className="footer__icon" />
            {playing?<PauseCircleOutlineIcon fontSize="large" className="footer__icon" onClick={toggle_playing}/>:<PlayCircleOutlineIcon fontSize="large" onClick={toggle_playing} className="footer__icon" />}
            <SkipNextIcon className="footer__icon" />
            {loop==false?<RepeatIcon className="footer__black" onClick={toggleloop}/>:<RepeatIcon className="footer__blue" onClick={toggleloop}/>}
            </div>
        </div>
        <div className="footer__center"> 
            
            <p>{elapsed}</p>
            <div className='song_slider'>
            <Slider  max={duration_sec} value={elapsed_sec} color='transparent' ></Slider></div>
            <p>{duration}</p>

            {fav?<FavoriteIcon className='fav__icon' onClick={toggle_fav}/>:<FavoriteBorderIcon className='fav__black' onClick={toggle_fav}/>}
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