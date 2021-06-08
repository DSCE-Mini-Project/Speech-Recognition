import './App.css';
import Speech_recognition from './speech-recognition';
import Youtubeapi from './youtubeapi';
import React from 'react'
import Button from '@material-ui/core/Button';
import { useRef, useState } from "react"; 
import Login from './login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  
  return (<div className='speech_recognition'>
   
    
   
    <Router>
      <div className="app">
        <Switch>
          <Route path="/speech_recognition">
          <Speech_recognition /> 
          </Route>
          <Route path="/youtubeapi">
          <Youtubeapi /> 
          </Route>
          
          <Route path="/">
          <Login/>
          </Route>
        </Switch>
      </div>
    </Router>
  </div>);
}

export default App;
