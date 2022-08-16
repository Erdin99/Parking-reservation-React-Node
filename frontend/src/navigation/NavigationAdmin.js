import React from "react";
import "./navigation.css";
import parking_logo from '../images/parking_logo.png'
import { Link } from "react-router-dom";

function NavigationAdmin() {
    return(
        <nav role="navigation" className="primary-navigation">
            <div className="logo-space">
                <img src={parking_logo} width="400" height="70" alt="parking logo" className="parking_logo"></img>
            </div>
            <ul>
                <li><Link to="/users/admin">Početna</Link></li>
                <li><Link to="#">Zajednički zid</Link></li>
                <li><a href="#">Moj profil</a></li>
                <li><a href="#">Postavi parking prostor</a></li>
                <li><a href="#">Kontakt</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </nav>
    );
};

export default NavigationAdmin;