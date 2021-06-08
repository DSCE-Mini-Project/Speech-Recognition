import React, { useState } from 'react';
import './signup.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import Button from '@material-ui/core/Button';
import {auth} from './firebase';
import { Link, useHistory } from "react-router-dom";
function Signup() {
    const history = useHistory(); 
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault();
    
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            // it successfully created a new user with email and password
            if (auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }
    return (
        
             <div className='signup_box'>
            <div className="signup__container">
              <h1 className="Sign_Up">Sign-Up</h1>

              <form>
                <div className="email_box">
                  <MailOutlineIcon className="email_icon" />
                  <div className="email_text">
                    <input type="email" className="email" autoComplete="off" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                  </div>
                </div>
                  <div className="username_box">
                    <PermIdentityIcon className="username_icon" />
                    <div className="username_text">
                      <input
                        type="text"
                        className="username"
                        autoComplete="off"
                        value={username}
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                  </div>  
                <div className="password_box">
                  <HttpsOutlinedIcon className="password_icon" />
                  <div className="password_text">
                    <input 
                      type="password"
                      value={password}
                      autoComplete="off"  
                      className="password"
                      placeholder="Password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <Button
                  variant="contained"
                  color="primary"
                  className="submit_button"
                  onClick={signIn}
                >
                  Signup
                </Button>
            </div>
            </div>

    )
}

export default Signup
