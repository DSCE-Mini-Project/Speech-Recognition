import React from 'react'
import './music.css'
import response_music from './response_music';
function Music() {
    
    return (
        <div className='music'>
           {response_music.items.map((item)=><MusicTile item={item}/>)}
          
        </div>
    )
}

export default Music

function MusicTile({item}) {
    return (
        <div className='music__tile' onClick={()=>console.log(item.id)}>
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
