import { useState } from 'react'
import './signin.css'
import Login from './Login';
import Register from './Register';
export default function Auth() {
    const [isSignUp,setIsSignUp]= useState(false)

  return (
 <div className='bg-black' >
<div className="login_body ">
  <div className={`cont ${isSignUp ? 'right-panel-active' : ''}`} id="container">
    <div className="form-container sign-up-container py-6">
<Register setIsSignUp={setIsSignUp}/>
    </div>
  
    <div className="form-container sign-in-container">
     <Login />
    </div>
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1 className="big_heading mb-5">Welcome Back!</h1>
          <p className="para mb-5">To keep connected with us please login with your personal info</p>
          <button  onClick={()=>setIsSignUp(false)} className="ghost login_button" id="signIn">Login</button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1 className="big_heading mb-5">Free Trial</h1>

          <p className="para mb-6">Enter your personal details Verify Your Email Adress and start 30 minutes Free trial</p>

          <button onClick={()=>setIsSignUp(true)} className="ghost login_button" id="signUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</div>


</div>

  )
}
