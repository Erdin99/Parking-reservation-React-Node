import React, {useState} from "react";
import "./initialPageAdmin.css";
import parking from "../images/parking.jpg"
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";

function InitialPageAdmin() {
    
    const [numberOfParking, setNumberOfSpots] = useState(1);

    
    return (
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">    
                <div className="admin-title">
                    <h1>Lista Vaših parking mjesta:</h1>
                </div>
                <div className="underline"></div>
                {numberOfParking === 0 && (
                    <div className="admin-parking-spot-info">
                        <h2>Trenutno nemate niti jedan postavljen parking prostor za iznajmljivanje</h2>
                    </div>
                    )
                }
                <article className="single-parking-space">
                    <img src={parking} alt="parking image" />
                    <footer>
                        <div className="parking-info">
                        <h4>Ime parkinga</h4>
                        <h4 className="parking-price">5 KM</h4>
                        </div>
                        <p>Adresa</p>
                        <div className="buttons">
                            <Link to="/parking/details" className="info-btn">Vidi objavu</Link>
                            <Link to="/edit/post" className="edit-btn">Uredi objavu</Link>
                            <button className="delete-btn">Izbriši objavu</button>
                        </div>
                    </footer>
                </article>

                <article className="single-parking-space">
                    <img src={parking} alt="parking image" />
                    <footer>
                        <div className="parking-info">
                        <h4>Ime parkinga</h4>
                        <h4 className="parking-price">5 KM</h4>
                        </div>
                        <p>Adresa</p>
                        <div className="buttons">
                            <button className="info-btn">Vidi objavu</button>
                            <button className="edit-btn">Uredi objavu</button>
                            <button className="delete-btn">Izbriši objavu</button>
                        </div>
                    </footer>
                </article>
            </div>
        </>
    );
};

export default InitialPageAdmin;