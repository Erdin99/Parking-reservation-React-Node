import React, { useState } from "react";
import "./navigation.css";
import parking_logo from '../images/parking_logo.png'
import { Link } from "react-router-dom";

function Navigation() {

    const adminRole = 1;
    const [role, setRole] = useState(1);

    return(
        <nav role="navigation" className="primary-navigation">
            <div className="logo-space">
                <img src={parking_logo} width="400" height="70" alt="parking logo" className="parking_logo"></img>
            </div>
            <ul>
                {role === adminRole ? 
                    <li><Link to="/users/admin">Početna</Link></li> : <li><Link to="/users/user">Početna</Link></li>
                }
                <li><Link to="/common/wall">Zajednički zid</Link></li>
                <li><Link to="/my/profile">Moj profil</Link></li>
                {role === adminRole ?
                    <li><Link to="/parking/space/form">Postavi parking prostor</Link></li> : ""
                }
                <li><Link to="/about/me">O kreatoru sistema</Link></li>
                <li><Link to="#">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;