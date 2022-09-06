import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom';


const link = {
  position : 'absolute',
  top : '83%',
  left : '47%',
  color : '#1DA1F2',
  textDecoration: 'none'
}

const formStyle = {
  position : "absolute",
  top : '29%',
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
  top : '14%',
  width : '60px'
}

function Signup() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [image ,setImage] = useState('');
  const [verdict,setVerdict] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(username);
    console.log(password);
    axios.post('http://localhost:4000/signup',{
      username : username,
      name : name,
      password : password,
      email : email,
      image : image
    }).then(response=>{
      console.log(response.data);
      if(response.data==='ok'){
        navigate('/login',{ replace : true })
      }else{
        setVerdict('try with diffrent username and email');
      }
      // if(response.data==='duplicate'){
      //   setVerdict('try with diffrent username and password');
      // }else{
      //   navigate('/login',{ replace : true });
      // }
      // setVerdict('Please Login Again');
      // navigate('/login',{ replace : true });
    })
  }

  const handleLogin = () => {
    navigate('/login',{ replace : true })
  } 

  return (
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png" alt='twitter_logo' style={logo}></img>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="text" className="form-control"  placeholder="name" onChange={(event)=> setName(event.target.value)} required/><br />
        <input type="text" className="form-control"  placeholder="Username" onChange={(event)=> setUsername(event.target.value)} required/><br />
        <input type="text" className="form-control"  placeholder="Email" onChange={(event)=> setEmail(event.target.value)} required/><br />
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} required/><br />
        <input type="text" className="form-control"  placeholder="Link of picture" onChange={(event)=> setImage(event.target.value)} required/><br />
        <button type="submit" className="btn btn-primary transparent" style={buttonStyle}>Submit</button>
      </form>
      <h2>{verdict}</h2>
      <Link to="/login" style={link} onClick={handleLogin}>Login . . .</Link>
    </div>
  )
}

export default Signup