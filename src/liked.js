import React, { useEffect } from "react";
import { useDataLayerValue } from "./DataLayer";
import { useRef, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./liked.css";
import { auth,db } from "./firebase";
function Liked() {
  const [{ uid }, dispatch] = useDataLayerValue();
  const [value, setValue] = useState("Music");
  const [favvideos,setFavvideos]=useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    db.collection('favourite').onSnapshot(snapshot=>(
        setFavvideos(snapshot.docs.map(doc=>doc.data()))
    ))
    
  }, [])
  return (
    <div className="liked">
      <div className="radio">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className="radio_buttons"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="Music" control={<Radio />} label="Music" />
          <FormControlLabel value="Video" control={<Radio />} label="Video" />
        </RadioGroup>
      </div>
      <div className='liked_items'>
        {favvideos.map(({id,channeltitle,duration,title,url})=>(<VideoTile id={id} channeltitle={channeltitle} duration={duration} title={title} url={url} ></VideoTile>))}
      </div>
    </div>
  );
}

export default Liked;

function VideoTile({id,channeltitle,duration,title,url}) {
  return (
    <div className='video__tile' onClick={()=>console.log(id)}>
     
      <img className='videocard__thumbnail' src={url}></img>
      
      <div className='videoCard__info'>
      <h4>{title}</h4>
      <p>{channeltitle}</p>
      <p>{duration}</p>
      </div>
    
    </div>
  )
}
