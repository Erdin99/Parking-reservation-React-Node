import React from "react";
import "./initialPage.css";
import {Link, Outlet} from 'react-router-dom';

function InitialPage() {
    return (
        <div className="full-screen bg-home">
            <div className="horizontal">
                <Link to="/usage" className="button button3">Način korištenja</Link>
            </div>
            <div className="bg-text">
                <h2>Sistem na kojem možeš rezervisati parking mjesto bilo gdje u Sarajevu!</h2>
                <h1 className="title">Rezervacija parking mjesta!</h1>
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
