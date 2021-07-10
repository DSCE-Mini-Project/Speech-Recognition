import React from "react";
import "./header.css";
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import Mic from "@material-ui/icons/Mic";
function Header() {
  return (
    <div className="header">
      <div className="header_left">
        <img className='website_logo' src='https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1934&q=80' alt=' Logo'></img>
        <p>Website_name</p>
      </div>
      <div className="header_center">
        <div className='search_bar'>
            <SearchIcon className='search_icon'></SearchIcon>
            <input type='text' className='search_text' placeholder='Search for songs,videos and ...'></input>
        </div>
        <Mic></Mic>
      </div>
      <div className="header_right">
        
        <h5>Username</h5>
      <img className='profile_pic' src='https://images.unsplash.com/photo-1624916889482-f94b10311333?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80' alt=' Profile pic'></img>
      <img className='emotion' src='https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' alt=' Profile pic'></img>
      </div>
    </div>
  );
}

export default Header;
