import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useAuth } from '../Helper/AuthProvider'

const divStyle = {
  top : '55px',
  left : '35%',
  maxWidth : "400px"
}

const imgstyle = {
  width : '90px'
}

function Home() {
  const [tweets,setTweets] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    axios.post('http://localhost:4000/tweet',{
      username : auth.username
    }).then( (response)=>{
      console.log(response.data);
      setTweets(response.data);
    })
    // eslint-disable-next-line
  },[]);
   
  return (
    <div>
      <Navbar />
      <div>
        {
          tweets.map((item)=>{
            let name = item.name;
            let array = item.tweet;
            let image = item.image;
            return(
              array.map((eachTweet)=>{
                return (
                  <div className="card border-dark mb-3" key={Date.now().toString(36) + Math.random().toString(36)} style={divStyle}>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img src={image} className="card-img" alt="some__" style={imgstyle}/>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{name}</h5>
                          <p className="card-text">{eachTweet}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
            })
            )
          })
        }
      </div>
    </div>
  );
}

export default Home

