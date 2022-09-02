import React from "react";
import "./initialPage.css";
import {Link, Outlet} from 'react-router-dom';
import parking_logo from '../images/parking_logo.png'

function InitialPage() {
    return (
        <div className="full-screen bg-home">
            <div className="horizontal">
                <img src={parking_logo} width="400" height="70" alt="parking logo" className="parking_logo"></img>
            </div>
            <div className="bg-text">
                <h2>Sistem na kojem možeš rezervisati parking mjesto bilo gdje u Sarajevu!</h2>
                <h1 className="title-project">Rezervacija parking mjesta!</h1>
                <p>Ukoliko ste prvi put na sistemu neophodno je kreirati korisnički račun.</p>
                <p>To uradite klikom na dugme sign up.</p>
                <Link to="/login" className="button button1">Login</Link>
                <Link to="/signup" className="button button2">Sign up</Link>
                <Outlet />
            </div>
        </div>
    )
};

export default InitialPage;
