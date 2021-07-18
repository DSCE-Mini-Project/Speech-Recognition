import React, { useState } from "react";
import "./loginpage.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { auth, db, storage } from "./firebase";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDataLayerValue } from "./DataLayer";
import PersonIcon from '@material-ui/icons/Person';
import Person from "@material-ui/icons/Person";
import FlareComponent from 'flare-react';
function Loginpage() {
  const [open, setOpen] = useState(false);
  const [{ uid }, dispatch] = useDataLayerValue();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signin, setSignin] = useState(false);
  const [image, setImage] = useState("");
  const [previewimg,setPreview]=useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggle = () => {
    if (signin == false) {
      setSignin(true);
    } else {
      setSignin(false);
    }
  };
  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        dispatch({
          type: "SET_UID",
          uid: auth.user.uid,
        });
        history.push("/speech_recognition");
      })
      .catch((error) => alert(error.message));
  };
  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          dispatch({
            type: "SET_UID",
            uid: auth.user.uid,
          });
          
          storage
            .ref(`/profile/${auth.user.uid}`)
            .put(image)
            .on("state_changed", alert("user created"),alert,()=>{
              storage.ref("profile").child(auth.user.uid).getDownloadURL()
            .then((url) => {
              db.collection("profile")
            .doc(auth.user.uid)
            .set({ username: username,'url':url });
             })
            });        
          
          history.push("/speech_recognition");
        }
      })
      .catch((error) => alert(error.message));
  };
  const resetpassword = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then((auth) => {
        handleClose();
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="image">
      <FlareComponent width={400} height={400} animationName='headphones' transparent={true} file="headphones.flr"/>
      </div>
      <div className="details">
        <div className="centered">
          {signin ? (
            <h2 className="login_title"> Sign Up</h2>
          ) : (
            <h2 className="login_title"> Log In </h2>
          )}
          {signin ? (
            <div className='upload_image'>
              <Button
                variant="contained"
                component="label"
                style={{ borderRadius: 50 }}
                className="image_select"
              >
                {image!='' ? <img src={previewimg} className='dp'></img>:<PersonIcon style={{ fontSize: 40 }} className='person_icon'></PersonIcon>}

                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                    setImage(e.target.files[0]);  
                  }}
                />
          
              </Button>
            </div>
          ) : (
            <div></div>
          )}

          {signin ? (
            <div className="username_box">
              <div className="username_icon">
                <PermIdentityIcon className="username_icon" />
              </div>
              <div className="username_text">
                <input
                  type="text"
                  className="username"
                  autoComplete="off"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="email_box">
            <div className="email_icon">
              <MailOutlineIcon className="email_icon" />
            </div>
            <div className="email_text">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email"
                autoComplete="off"
                placeholder="example@gmaill.com"
              />
            </div>
          </div>

          <div className="password_box">
            <div className="password_icon">
              <HttpsOutlinedIcon className="password_icon" />
            </div>
            <div className="password_text">
              <input
                type="password"
                value={password}
                autoComplete="off"
                className="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {signin ? (
            <div className="submit">
              <Button
                variant="contained"
                color="primary"
                className="submit_button"
                onClick={signUp}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="submit">
              <Button
                variant="contained"
                color="primary"
                className="submit_button"
                onClick={login}
              >
                Log In
              </Button>
            </div>
          )}
          {signin ? (
            <p className="account_question">
              Already have an account?{" "}
              <span className="question" onClick={toggle}>
                Log in
              </span>
            </p>
          ) : (
            <p className="account_question">
              Dont have an account?{" "}
              <span className="question" onClick={toggle}>
                sign up
              </span>
            </p>
          )}
          <p className="forgot">
            <span className="forgot_password" onClick={handleClickOpen}>
              Forgot password?
            </span>
          </p>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Reset password link will be sent to your email id click on the
                link and reset your password .
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={resetpassword}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
