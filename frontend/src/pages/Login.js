import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../Helper/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const link = {
  position : 'absolute',
  top : '65%',
  left : '44%',
  color : '#1DA1F2',
  textDecoration: 'none'
}

const formStyle = {
  position : "absolute",
  top : '33%',
  left : '36%',
  maxWidth : '400px'
}

const buttonStyle = {
  minWidth : '400px',
  backgroundColor : '#1DA1F2'
}

const logo = {
  position : 'absolute',
  left : '47%',
  top : '17%',
  width : '60px'
}

function Login() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [verdict,setVerdict] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) =>{
    event.preventDefault();
    // console.log(username);
    // console.log(password);
    axios.post('http://localhost:4000/login',{
      username : username,
      password : password
    }).then(response=>{
      console.log(response.data);
      if(response.data==='user doesnt exist'){
        setVerdict('user doesnt exist')
      }else if(response.data==='not a match'){
        setVerdict('username and password do not match')
      }else{
        console.log(response.data);
        auth.LoginUsername(response.data.username);
        auth.LoginName(response.data.name);
        auth.LoginEmail(response.data.email);
        auth.LoginImage(response.data.image);
        setVerdict('')
        navigate('/',{ replace: true });
      }
    })
  }

  const handleSignUP = () => {
    navigate('/signup',{ replace : true })
  }

  return (
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png" alt='twitter_logo' style={logo}></img>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="text" className="col-xs-4 form-control" id="exampleInputEmail1"  placeholder="Username" onChange={(event)=> setUsername(event.target.value)} required/><br />
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} required/><br />
        <button type="submit" className="btn btn-primary transparent" style={buttonStyle}>Submit</button>
      </form>
      <h2>{verdict}</h2>
      <Link to="/signup" style={link} onClick={handleSignUP}>New User? Sign Up . . .</Link>
    </div>
  )
}

export default Login