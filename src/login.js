import React, { useState } from 'react';
import './login.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";
import {auth} from './firebase';
function Login() {
  const history = useHistory(); 
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signup = e => {
    e.preventDefault();
   history.push('/Signup')
       
}
  const signIn = e => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/speech_recognition')
        })
        .catch(error => alert(error.message))
}
    return (
      <div className="login_page">
        <div className="header">
          <h1 className="website_name">Website</h1>
          <div className="Sign_up_box" onClick={signup}>
            <h5 className="Sign_up" >Sign Up</h5>
          </div>
        </div>
        <div className="login_body">
          {/* <img
          className="login__image"
          src="https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
          alt=""
        /> */}
          <div className="login_box">
            <div className="login__container">
              <h1 className="Sign_in">Sign-in</h1>

              <form>
                <div className="email_box">
                  <MailOutlineIcon className="email_icon" />
                  <div className="email_text">
                    <input type="email" className="email" autoComplete="off" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                  </div>
                </div>
                  {/* <div className="username_box">
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
                  </div> */}  
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
                  Login
                </Button>
            </div>
          </div>  
        </div>
      </div>
    );
}

export default Login
