import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import "./initialPageUser.css";
import parkingImage from "../images/parking.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function InitialPageAdmin() {

    const [parkingListFilter, setParkingListFilter] = useState('0');
    const [parkingList, setParkingList] = useState([]);
    
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('user')))
        setParkingListFilter(JSON.parse(window.sessionStorage.getItem("parkingListFilter")))
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem("parkingListFilter", parkingListFilter);
        getParkingData();
    }, [parkingListFilter]);
    
    function getParkingData() {
        // axios.get(`http://localhost:5000/lists/parking/${parkingListFilter}`).then(res => {
        //     setParkingList(res.data.parkings);
        // }).catch(err => console.log(err));

        axios({
            method: "get",
            url: `http://localhost:5000/lists/parking/${parkingListFilter}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setParkingList(res.data.parkings);
        }).catch(err => console.log(err))
    }

    return (
        <>
            <div className="full-screenAdmin">
                <div className="navigation">
                    <Navigation />
                </div>    
                <div className="content">
                    <div className="title">
                        <h3>Lista parking mjesta</h3>
                        <select name="filter" id="filter" className="filter" onChange={e => setParkingListFilter(e.target.value)}>
                            <option value="0" selected={parkingListFilter === 0}>Slučajan prikaz liste parking prostora</option>
                            <option value="1" selected={parkingListFilter === 1}>Najjeftiniji - najskuplji parking prostor</option>
                            <option value="2" selected={parkingListFilter === 2}>Najskuplji - najjeftiniji parking prostor</option>
                            <option value="3" selected={parkingListFilter === 3}>Najviše - najmanje slobodnog parking prostora</option>
                            <option value="4" selected={parkingListFilter === 4}>Najmanje - najviše slobodnog parking prostora</option>
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