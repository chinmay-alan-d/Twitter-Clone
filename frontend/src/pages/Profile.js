import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { useAuth } from '../Helper/AuthProvider'
import Navbar from '../Navbar/Navbar'

const styleDiv = {
  position : 'absolute',
  minWidth : '400px',
  top : '15%',
  left : '30%'
}

function Profile() {
  const auth = useAuth();
  const [follwer, setFollwer] = useState([]);
  const [following, setFollowing] = useState([]);
  const [displayFollower, setDisplayFollower] = useState([])
  const [displayFollowing, setDisplayFollowing] = useState([])
  const [dis, setDis] = useState('');

  useEffect(() => {
    axios.post('http://localhost:4000/loggeduser',{
    username : auth.username
  }).then(response=>{
    // console.log(response.data[0]);
    setFollwer(response.data[0]);
    setFollowing(response.data[1]);
  })
  //eslint-disable-next-line
  },[follwer,following])
  

  function handleClickFollowers(){
    setDisplayFollower(follwer)
    setDisplayFollowing([]);
    setDis('Follwer')
  }

  function handleFollowing(){
    setDisplayFollowing(following);
    setDisplayFollower([]);
    setDis('Following')
  }

  return (
    <div>
      <Navbar />
      <div className="card mb-3" style={styleDiv}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={auth.image} className="card-img" alt="Profile_pic" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{auth.name}</h3>
              <p className="card-text">{auth.username}</p>
              <p className="card-text">{auth.email}</p>
              <button className='btn btn-dark mr-1' onClick={handleClickFollowers}>Followers {follwer.length}</button>
              <button className='btn btn-dark' onClick={handleFollowing}>Following {following.length}</button>
            </div>
          </div>
          </div>
        </div>
        <div>
          <h5 style={{position : 'absolute',top:'45%',left : '40%'}}>
            {dis}
          </h5>
          <div>
            {
              displayFollower.map((fler)=>{
                // console.log(fler);
                return(
                  <div  className="card mt-3 col-md-40" style={{width: "12rem",position : 'relative',left : '35.5%',top : '310px',height : '100px'}} key={Date.now().toString(36) + Math.random().toString(36)}>
                    <img className="card-img-top" src={fler.image} alt="image__" style={{width : '40px'}}></img>
                    <div className="card-body" style={{position : 'relative', right : '-45px',top : '-50px'}}>
                      <h6 className="card-text-right">{fler.name}</h6>
                      <p className='card-text'>{fler.username}</p>
                    </div>
                </div>
                )
              })
            }
          </div>
          <div>
            {
              displayFollowing.map((flg)=>{
                return(
                  <div  className="card mt-3 col-md-40" style={{width: "12rem",position : 'relative',left : '35.5%',top : '310px',height : '100px'}} key={Date.now().toString(36) + Math.random().toString(36)}>
                    <img className="card-img-top" src={flg.image} alt="image__" style={{width : '40px'}}></img>
                    <div className="card-body" style={{position : 'relative', right : '-45px',top : '-50px'}}>
                      <h6 className="card-text-right">{flg.name}</h6>
                      <p className='card-text'>{flg.username}</p>
                    </div>
                </div>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Profile