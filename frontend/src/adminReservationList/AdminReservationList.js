import React, {useState, useEffect} from "react";
import Navigation from "../navigation/Navigation";
import "./adminReservationList.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function AdminReservationList() {
    
    const parkingId = new URLSearchParams(window.location.search).get('id');

    const [button1, setButton1] = useState(true);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);

    const [reservations, setReservations] = useState([]);
    const [delayedReservations, setDelayedReservations] = useState([]);

    const [code, setCode] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem("user") === null) {
            navigate('/login');
        }
        else {
            getReservations();
            getDelayedReservations();
        }
    }, [reservations]);

    function getReservations() {
        axios({
            method: "get",
            url: `http://localhost:5000/reservations/${parkingId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setReservations(res.data.listOfReservationForMyParking);
        }).catch(err => console.log(err))
    }

    function getDelayedReservations() {
        axios({
            method: "get",
            url: `http://localhost:5000/refused/reservations/${parkingId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setDelayedReservations(res.data.listOfRefusedReservationForMyParking);
        }).catch(err => console.log(err))
    }

    function seeSearchResult() {
        navigate(`/searched/result/:?code=${code}`)
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

    function showDelayedReservations() {
        setButton1(false);
        setButton2(false);
        setButton3(true);
    }

    function delayUserReservation(id) {
        axios({
            method: "patch",
            url: `http://localhost:5000/refuse/users/reservation/${id}`,
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
                    <button className="button-list-option" onClick={(e) => showDelayedReservations()} style={{backgroundColor: button3 === true?"#26272b":"", color: button3 === true?"white": "black"}}>Odgođene rezervacije</button>
                </div>
                {button1 && 
                    <div className="free-spots-info">
                        <form className="search-user-form" onSubmit={seeSearchResult}>
                            <label className="search-user">Pretraži korisnika po kodu: </label>
                            <input type="text" className="search-by-code" value={code} onChange={(e) => setCode(e.target.value)} required></input>
                            <button type="submit" className="search-button">Pretraži</button>
                        </form>
                    </div>
                }
                
                <div className="list">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Parking</th>
                        <th>Adresa parkinga</th>
                        <th>Registracijske oznake</th>
                        <th>Početak rezervacije</th>
                        <th>Kraj rezervacije</th>
                        <th>Kod</th>
                        {button1 && <th>Odgodi rezervaciju</th>}
                        {!button1 && <th>Datum rezervacije</th>}
                    </tr>
                    {button1 && (
                        <>
                            {reservations.map((reser) => {
                                return (
                                    <>
                                        {(formatDate(new Date()) === reser.reservation_date && reser.status === 'Odobreno') &&
                                            <tr>
                                                <td data-label="Username">{reser.reserved_by_username}</td>
                                                <td data-label="Email">{reser.reserved_by_email}</td>
                                                <td data-label="Parking">{reser.reservation_parking_name}</td>
                                                <td data-label="Adresa parkinga">{reser.reservation_parking_address}</td>
                                                <td data-label="Registracijske oznake">{reser.registration_plates}</td>
                                                <td data-label="Početak rezervacije">{reser.begin_reservation}</td>
                                                <td data-label="Kraj rezervacije">{reser.end_reservation}</td>
                                                <td data-label="Kod">{reser.code}</td>
                                                {button1 && <td data-label="Odgodi"><button className="delete-button" onClick={() => delayUserReservation(reser.id)}>Odgodi</button></td>}
                                            </tr>
                                        }
                                    </>
                                )
                            })}
                        </>
                    )}

                    {button2 && (
                        <>
                            {reservations.map((reser) => {
                                return (
                                    <tr>
                                        <td data-label="Username">{reser.reserved_by_username}</td>
                                        <td data-label="Email">{reser.reserved_by_email}</td>
                                        <td data-label="Parking">{reser.reservation_parking_name}</td>
                                        <td data-label="Adresa parkinga">{reser.reservation_parking_address}</td>
                                        <td data-label="Registracijske oznake">{reser.registration_plates}</td>
                                        <td data-label="Početak rezervacije">{reser.begin_reservation}</td>
                                        <td data-label="Kraj rezervacije">{reser.end_reservation}</td>
                                        <td data-label="Kod">{reser.code}</td>
                                        <td data-label="Datum rezervacije">{reser.reservation_date}</td>
                                    </tr>
                                )
                            })}
                        </>
                    )}
                    
                    {button3 && (
                        <>
                            {delayedReservations.map((delres) => {
                                return (
                                    <tr>
                                        <td data-label="Username">{delres.reserved_by_username}</td>
                                        <td data-label="Email">{delres.reserved_by_email}</td>
                                        <td data-label="Parking">{delres.reservation_parking_name}</td>
                                        <td data-label="Adresa parkinga">{delres.reservation_parking_address}</td>
                                        <td data-label="Registracijske oznake">{delres.registration_plates}</td>
                                        <td data-label="Početak rezervacije">{delres.begin_reservation}</td>
                                        <td data-label="Kraj rezervacije">{delres.end_reservation}</td>
                                        <td data-label="Kod">{delres.code}</td>
                                        <td data-label="Datum rezervacije">{delres.reservation_date}</td>
                                    </tr>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminReservationList;