import React, { useState , useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import {useAuth} from '../Helper/AuthProvider.js'

const textStyle = {
  minWidth : '700px'
}

const TweetStyle = {
  position : 'absolute',
  backgroundColor : '#1DA1F2',
  left : '33%',
  minWidth : '270px'
}

const DivStyle = {
  position : 'absolute',
  left : '30%',
}

const divStyle = {
  // position : 'absolute',
  top : '210px',
  left : '35%',
  maxWidth : "400px"
}

const mytweet = {
  position : 'absolute',
  top : '27%',
  left : '43%'
}

function Tweet() {
  const [tweet,setTweet] = useState('');
  const [mytweets,setMyTweets] = useState([]);
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(auth.username);
    axios.put("http://localhost:4000/tweet",{
      username : auth.username,
      tweet : tweet
    }).then(response=>{
      console.log(response);
    })
  }

  useEffect (()=> {
    // console.log(auth.username)
    axios.get("http://localhost:4000/tweet/"+auth.username).then(response=>{
      // console.log(response.data);
      setMyTweets(response.data)
    })
  })

  return (
    <div>
      <Navbar />
      <div style={DivStyle}>
        <form onSubmit={handleSubmit}>
          <br />
          <input className="form-control form-control-sm" type="text" placeholder="What's happening? . . . " onChange={(e) => setTweet(e.target.value)} style={textStyle} required></input><br />
          <button className='btn btn-primary' style={TweetStyle}>Tweet</button>
        </form>
      </div>
      <h3 style={mytweet}>My Tweets</h3>
      <div>
        {
          mytweets.map((mytweet)=>{
            // console.log(mytweet);
            // console.log(auth.image);
            return( 
              <div className="card mb-2" key={Date.now().toString(36) + Math.random().toString(36)} style={divStyle}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={auth.image} className="card-img" alt="some__" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{auth.name}</h5>
                      <p className="card-text">{mytweet}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Tweet