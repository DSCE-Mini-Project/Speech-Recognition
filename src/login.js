import React from 'react'
import './login.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import Button from '@material-ui/core/Button';
function Login() {
    const inputProps = {
        step: 300,
      };
    return (
      <div className="login_page">
        <div className="header">
          <h1 className="website_name">Website</h1>
          <div className="Sign_up_box">
            <h5 className="Sign_up">Sign Up</h5>
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
                    <input type="text" className="email" placeholder="Email" />
                  </div>
                </div>
                <div className="username_box">
                  <PermIdentityIcon className="username_icon" />
                  <div className="username_text">
                    <input
                      type="text"
                      className="username"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="password_box">
                  <HttpsOutlinedIcon className="password_icon" />
                  <div className="password_text">
                    <input
                      type="text"
                      className="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </form>
              <Button
                  variant="contained"
                  color="primary"
                  className="submit_button"
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
