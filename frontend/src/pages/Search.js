import React,{ useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useAuth } from '../Helper/AuthProvider'
import { useNavigate } from 'react-router-dom';

function Search() {
    const [search, setSearch] = useState('');
    const [users,setUsers] = useState([]);
    // let [follower, setFollower] = useState(0)
    const auth = useAuth();
    const navigate = useNavigate();

    const textStyle = {
      position : 'absolute',
      left : '35%',
      maxWidth : '400px'
    }

    function handleSearch (event) {
      setSearch(event.target.value)
      axios.post('http://localhost:4000/search',{
        search : search,
        iUsername : auth.username
      }).then( (response)=>{
        setUsers(response.data);
        // console.log(response.data);
        console.log(users);
      })
    }

    return (
    <div>
        <Navbar />
        <h2 style={{position : 'relative',left : '45%'}}>Search</h2>
        <input className="form-control form-control-sm" type="text" placeholder="Search" onChange={handleSearch} style={textStyle} required></input>
        <div>
          {
            users.map((user)=>{
              function handleClick (){
                console.log("clicked at "+user.name);
                let profile = user.username;
                navigate('/'+profile);
              }

              return(
                <div  className="card mt-3 col-md-40" style={{width: "200px",position : 'relative',left : '42.5%',top : '55px',height : '100px'}} key={Date.now().toString(36) + Math.random().toString(36)} onClick={handleClick} >
                    <img className="card-img-top" src={user.image} alt="image__" style={{width : '40px'}}></img>
                    <div className="card-body" style={{position : 'relative', right : '-45px',top : '-50px'}}>
                      <h6 className="card-text-right">{user.name}</h6>
                      <p className='card-text'>{user.username}</p>
                    </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Search