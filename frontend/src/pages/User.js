import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../Helper/AuthProvider';

const styleProfile = {
    position : 'absolute',
    left : '550px',
    top : '110px'
}

const txt = {
    position : 'relative',
    top : '-150px',
    left : '120px'
}

function User() {
    const params = useParams();
    const [name,setName]= useState('');
    const [username,setUsername]= useState('');
    const [email,setEmail]= useState('');
    const [follower,setFollower]= useState();
    const [pic,setPic] = useState('')
    const [following,setFollowing]= useState();
    const auth = useAuth();
    const [tweets,setTweets]= useState([]);

    axios.post('http://localhost:4000/profile',{
        username : params,
    }).then(response=>{
        setName(response.data.name);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setPic(response.data.pic);
        setTweets(response.data.tweets);
        setFollower(response.data.followers.length);
        setFollowing(response.data.following.length)
    })

    function handleClick(){
        axios.post('http://localhost:4000/follow',{
            loggedUsername : auth.username,
            destinationUsername : params 
        }).then(response=>{
            setFollower(response.data.destinationUsernameFollowers.length);
            setFollowing(response.data.destinationUsernameFollowing);
        })
    }

    return (
        <div>
            <Navbar />
            <div style={styleProfile}>
                <img className="card-img-top" src={pic} alt="image__" style={{width : '100px'}}></img>
                <div className="card-body" style={txt}>
                    <h4 className="card-text-right">{name}</h4>
                    <h6 className="card-text-right">{username}</h6>
                    <p className='card-text'>Followers {follower}</p>
                    <p className='card-text'>Following {following}</p>
                    <p className='card-text'>Email {email}</p>
                    <button onClick={handleClick} className='btn btn-dark'>Follow</button>
                </div>
            </div>
            <div>
                <h5 style={{position : 'absolute',top : '45%' , left : '45%'}}>Tweets</h5>
                {
                    tweets.map((tweet)=>{
                        return(
                            <div  className="card mt-3 col-md-40" style={{width: "400px",position : 'relative',left : '41%',top : '300px',height : '100px'}} key={Date.now().toString(36) + Math.random().toString(36)}>
                                <img className="card-img-top" src={pic} alt="image__" style={{width : '40px'}}></img>
                                <div className="card-body" style={{position : 'relative', right : '-45px',top : '-50px'}}>
                                    <h6 className="card-text-right">{name}</h6>
                                    <p className='card-text'>{tweet}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default User