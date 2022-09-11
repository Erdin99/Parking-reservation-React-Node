import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import "./reservationList.css";
import axios from "axios";

function ReservationList() {
    
    const [button1, setButton1] = useState(true);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);

    const [myReservations, setMyReservations] = useState([])
    const [myRefusedReservations, setMyRefusedReservations] = useState([])

    useEffect(() => {
        getMyReservations();
        getRefusedReservations();
    }, [myReservations, myRefusedReservations]);

    function getMyReservations() {
        
        axios({
            method: "get",
            url: `http://localhost:5000/my/reservations`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setMyReservations(res.data.listOfMyReservations);
        }).catch(err => console.log(err))
    }

    function getRefusedReservations() {
        axios({
            method: "get",
            url: `http://localhost:5000/my/refused/reservations`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setMyRefusedReservations(res.data.listOfMyRefusedReservations);
        }).catch(err => console.log(err))
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-');
    }

    function showTodaysReservations() {
        setButton1(true);
        setButton2(false);
        setButton3(false);
    }

    function showAllReservations() {
        setButton1(false);
        setButton2(true);
        setButton3(false);
    }

    function delayedReservations() {
        setButton1(false);
        setButton2(false);
        setButton3(true);
    }

    function delayReservation(id) {
        axios({
            method: "patch",
            url: `http://localhost:5000/refuse/reservation/${id}`,
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
                {button1 && <h1 className="reservation-list-title">Rezervisana mjesta za: {formatDate(new Date())}</h1>}
                
                <div className="three-button-row">
                    <button className="button-list-option" onClick={(e) => showTodaysReservations()} style={{backgroundColor: button1 === true?"#26272b":"white", color: button1 === false?"black":"white"}}>Današnje rezervacije</button>
                    <button className="button-list-option" onClick={(e) => showAllReservations()} style={{backgroundColor: button2 === true?"#26272b":"", color: button2 === true?"white": "black"}}>Dosadašnje rezervacije</button>
                    <button className="button-list-option" onClick={(e) => delayedReservations()} style={{backgroundColor: button3 === true?"#26272b":"", color: button3 === true?"white": "black"}}>Odgođene rezervacije</button>
                </div>

                <div className="list">
                    <tr>
                        <th>Username</th>
                        <th>Parking</th>
                        <th>Adresa parkinga</th>
                        <th>Registracijske oznake</th>
                        <th>Početak rezervacije</th>
                        <th>Kraj rezervacije</th>
                        <th>Status rezervacije</th>
                        <th>Kod</th>
                        {button1 ? <th>Odgodi rezervaciju</th> : <th>Datum rezervacije</th>}
                    </tr>
                    {button1 && (
                        <>
                            {myReservations.map((reservation) => { 
                                return (
                                    <>
                                        {(formatDate(new Date()) === reservation.reservation_date && reservation.status === 'Odobreno') &&
                                            <tr>
                                                <td data-label="Username">{reservation.reserved_by_username}</td>
                                                <td data-label="Parking">{reservation.reservation_parking_name}</td>
                                                <td data-label="Adresa parkinga">{reservation.reservation_parking_address}</td>
                                                <td data-label="Registracijske oznake">{reservation.registration_plates}</td>
                                                <td data-label="Početak rezervacije">{reservation.begin_reservation}</td>
                                                <td data-label="Kraj rezervacije">{reservation.end_reservation}</td>
                                                <td data-label="Status rezervacije">{reservation.status}</td>
                                                <td data-label="Kod rezervacije">{reservation.code}</td>
                                                <td data-label="Odgodi rezervaciju"><button className="delete-button" onClick={() => {delayReservation(reservation.id)}}>Odgodi</button></td>
                                            </tr>
                                        }
                                    </>
                                )
        	                })}
                        </>
                    )}

                    {button2 && (
                        <>
                            {myReservations.map((reservation) => { 
                                return (
                                    <tr>
                                        <td data-label="Username">{reservation.reserved_by_username}</td>
                                        <td data-label="Parking">{reservation.reservation_parking_name}</td>
                                        <td data-label="Adresa parkinga">{reservation.reservation_parking_address}</td>
                                        <td data-label="Registracijske oznake">{reservation.registration_plates}</td>
                                        <td data-label="Početak rezervacije">{reservation.begin_reservation}</td>
                                        <td data-label="Kraj rezervacije">{reservation.end_reservation}</td>
                                        <td data-label="Status rezervacije">{reservation.status}</td>
                                        <td data-label="Kod rezervacije">{reservation.code}</td>
                                        <td data-label="Datum rezervacije">{reservation.reservation_date}</td>
                                    </tr>
                                )
        	                })}
                        </>
                    )}
                    
                    {button3 && (
                        <>
                        {myRefusedReservations.map((refusedReservation) => { 
                            return (
                                <>
                                    {refusedReservation.status === 'Odgodjeno' &&
                                        <tr>
                                            <td data-label="Username">{refusedReservation.reserved_by_username}</td>
                                            <td data-label="Parking">{refusedReservation.reservation_parking_name}</td>
                                            <td data-label="Adresa parkinga">{refusedReservation.reservation_parking_address}</td>
                                            <td data-label="Registracijske oznake">{refusedReservation.registration_plates}</td>
                                            <td data-label="Početak rezervacije">{refusedReservation.begin_reservation}</td>
                                            <td data-label="Kraj rezervacije">{refusedReservation.end_reservation}</td>
                                            <td data-label="Status rezervacije">{refusedReservation.status}</td>
                                            <td data-label="Kod rezervacije">{refusedReservation.code}</td>
                                            <td data-label="Datum rezervacije">{refusedReservation.reservation_date}</td>
                                        </tr>
                                    }
                                </>
                            )
                        })}
                    </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ReservationList;