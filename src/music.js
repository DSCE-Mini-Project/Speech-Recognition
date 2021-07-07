import React from 'react'
import './music.css'
import response_music from './response_music';
import {useDataLayerValue} from './DataLayer';
function Music() {
    
    return (
        <div className='music'>
           {response_music.items.map((item)=><MusicTile item={item}/>)}
          
        </div>
    )
}

export default Music

function MusicTile({item}) {
    const[{},dispatch]=useDataLayerValue();
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
        isaudio:true,
      })
      dispatch({
        type:"SET_THUMBNAIL",
        thumbnail:item.snippet.thumbnails.high.url,
      })
    }
    return (
        <div className='music__tile' onClick={()=>{setvalues()}}>
        <div className='musicCard__left'>
        <img className='musiccard__thumbnail' src={item.snippet.thumbnails.high.url}></img>
        </div>
        <div className='musicCard__info'>
        <h4>{item.snippet.title.split('|')[0]}</h4>
        <p>{item.snippet.channelTitle}</p>
        
        </div>
        <div className='musicCard__right'>
        <p >{item.snippet.publishedAt}</p>
        </div>
        
      </div>
    )
}
