import React from 'react'
import {Link} from 'react-router-dom'

const logo = {
    width : '30px'
}

function Navbar() {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <nav className="navbar navbar-light bg-light">
            <Link to="/">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png' style={logo} alt="logo"></img>
            </Link>
        </nav>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/tweet">Tweet</Link>
                </li>
                <li className="nav-item active">
                    <Link className='nav-link' to='/search'>Search</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar