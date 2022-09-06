import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import "./initialPageUser.css";
import parkingImage from "../images/parking.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function InitialPageAdmin() {

    const [parkingList, setParkingList] = useState([]);

    useEffect(() => {
        getParkingData();
    }, []);
    
    function getParkingData() {
        axios.get('http://localhost:5000/lists/parking').then(res => {
            setParkingList(res.data.parkings);
        }).catch(err => console.log(err));
    }

    console.log('parkingList->', parkingList);

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
                        {parkingList.map((parking) => {
                            return (
                                <Link to={`/parking/spot/:?id=${parking.id}`} className="w3-card">
                                    <div className="parking-image">
                                        <img src={parkingImage}></img>
                                    </div>
                                    <div className="parking-card-title">
                                        <h3>{parking.parking_name}</h3>
                                        <p>{parking.parking_address}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InitialPageAdmin;