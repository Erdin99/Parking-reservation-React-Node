import React, { useState, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import axios from "axios";

function SeachedResult() {

    const code = new URLSearchParams(window.location.search).get('code');

    const [searchTable, setSearchTable] = useState([]);


    useEffect(() => {
        searchByCode();
    }, [searchTable])
 
    function searchByCode() {
        axios({
            method: "get",
            url: `http://localhost:5000/search/${code}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            },
        }).then(res => {
            setSearchTable(res.data.searchedReservation[0])
        }).catch(error => { 
            console.log(error);
        });
    }

    function finishReservation(id) {
        axios({
            method: "patch",
            url: `http://localhost:5000/finished/reservation/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).catch(err => console.log(err))
    }
    

    return(
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                {searchTable.length === 0 ? 
                    <div className="admin-parking-spot-info">
                        <h2>Ni jedan korisnik nije izlistan pod unesenim kodom!</h2>
                    </div> :

                    <div className="list">
                        <>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Parking</th>
                                <th>Adresa parkinga</th>
                                <th>Registracijske oznake</th>
                                <th>Početak rezervacije</th>
                                <th>Kraj rezervacije</th>
                                <th>Kod</th>
                                <th>Status</th>
                                <th>Završena rezervacija</th>
                            </tr>
                
                            <tr>
                                <td data-label="Username">{searchTable.reserved_by_username}</td>
                                <td data-label="Email">{searchTable.reserved_by_email}</td>
                                <td data-label="Parking">{searchTable.reservation_parking_name}</td>
                                <td data-label="Adresa parkinga">{searchTable.reservation_parking_address}</td>
                                <td data-label="Registracijske oznake">{searchTable.registration_plates}</td>
                                <td data-label="Početak rezervacije">{searchTable.begin_reservation}</td>
                                <td data-label="Kraj rezervacije">{searchTable.end_reservation}</td>
                                <td data-label="Kod">{searchTable.code}</td>
                                <td data-label="Status">{searchTable.status}</td>
                                <td data-label="Završeno"><button className="delete-button" onClick={() => finishReservation(searchTable.id)}>Završeno</button></td>
                            </tr>
                        </>
                    </div>
                }    
            </div>
        </>
    )
};

export default SeachedResult;