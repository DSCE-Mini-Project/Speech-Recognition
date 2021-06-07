import React from 'react'
import './login.css'

function Login() {
    return (
    <div className="login_page">
        <div className="header">
            <h1 className='website_name'>Website</h1>
                <div className='Sign_up_box'>
                    <h5 className="Sign_up">Sign Up</h5>
                </div>
        </div> 
        <div className='login_body'>
        {/* <img
          className="login__image"
          src="https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
          alt=""
        /> */}
        <div className='login_box'>
        
            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text'  />

                    <h5>Password</h5>
                    <input type='password' />

                    <button type='submit' className='login__signInButton'>Sign In</button>
                </form>


                <button  className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
        
        </div> 
    </div>

    )
}

export default Login
