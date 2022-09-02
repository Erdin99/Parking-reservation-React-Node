import React from "react";
import Navigation from "../navigation/Navigation";
import "./initialPageUser.css";
import parking from "../images/parking.jpg";
import { Link } from "react-router-dom";

function InitialPageAdmin() {
    return (
        <>
            <div className="full-screenAdmin">
                <div className="navigation">
                    <Navigation />
                </div>    
                <div className="content">
                    <div className="title">
                        <h3>Lista parking mjesta</h3>
                        <select name="filter" id="filter" className="filter">
                            <option value="0">Slučajan prikaz liste parking prostora</option>
                            <option value="1">Najjeftiniji - najskuplji parking prostor</option>
                            <option value="2">Najskuplji - najjeftiniji parking prostor</option>
                            <option value="3">Najviše - najmanje slobodnog parking prostora</option>
                            <option value="4">Najmanje - najviše slobodnog parking prostora</option>
                        </select>
                    </div>
                    <div className="underline"></div>
                    <div className="w3-row w3-padding w3-border w3-gray" style={{margin: "auto"}}>
                        <Link to="/parking/spot" className="w3-card">
                            <div className="parking-image">
                                <img src={parking}></img>
                            </div>
                            <div className="parking-title">
                                <h3>SCC parking</h3>
                                <p>Vrbanja 1</p>
                            </div>
                        </Link>

                        <div className="w3-card">
                            <div className="parking-image">
                                <img src={parking}></img>
                            </div>
                            <div className="parking-title">
                                <h3>SCC parking</h3>
                                <p>Vrbanja 1</p>
                            </div>
                        </div>

                        <div className="w3-card">
                            <div className="parking-image">
                                <img src={parking}></img>
                            </div>
                            <div className="parking-title">
                                <h3>SCC parking</h3>
                                <p>Vrbanja 1</p>
                            </div>
                        </div>

                        <div className="w3-card">
                            <div className="parking-image">
                                <img src={parking}></img>
                            </div>
                            <div className="parking-title">
                                <h3>SCC parking</h3>
                                <p>Vrbanja 1</p>
                            </div>
                        </div>

                        <div className="w3-card">
                            <div className="parking-image">
                                <img src={parking}></img>
                            </div>
                            <div className="parking-title">
                                <h3>SCC parking</h3>
                                <p>Vrbanja 1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InitialPageAdmin;