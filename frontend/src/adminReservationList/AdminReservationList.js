import React, {useState} from "react";
import Navigation from "../navigation/Navigation";
import "./adminReservationList.css";

function AdminReservationList() {

    const [button1, setButton1] = useState(true);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);

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

 

    return(
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
            {button1 && <h1 className="reservation-list-title">Rezervisana mjesta za: 3.9.2022.</h1>}
                
                <div className="three-button-row">
                    <button className="button-list-option" onClick={(e) => showTodaysReservations()} style={{backgroundColor: button1 === true?"#26272b":"white", color: button1 === false?"black":"white"}}>Današnje rezervacije</button>
                    <button className="button-list-option" onClick={(e) => showAllReservations()} style={{backgroundColor: button2 === true?"#26272b":"", color: button2 === true?"white": "black"}}>Dosadašnje rezervacije</button>
                    <button className="button-list-option" onClick={(e) => showDelayedReservations()} style={{backgroundColor: button3 === true?"#26272b":"", color: button3 === true?"white": "black"}}>Odgođene rezervacije</button>
                </div>

                <div className="free-spots-info">
                    <h3>Preostali broj slobodnih mjesta je: <span>155</span></h3>
                </div>

                <div className="list">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Parking</th>
                        <th>Adresa parkinga</th>
                        <th>Registracijske oznake</th>
                        <th>Početak rezervacije</th>
                        <th>Kraj rezervacije</th>
                        <th>Za platiti</th>
                        {button1 && <th>Odgodi rezervaciju</th>}
                    </tr>
                    {button1 && (
                        <>
                            <tr>
                                <td data-label="Username">Mujke</td>
                                <td data-label="Email">mujo.mujic12@gmail.com</td>
                                <td data-label="Parking">Alta parking</td>
                                <td data-label="Adresa parkinga">Franca Lehara 2</td>
                                <td data-label="Registracijske oznake">A12-A-123</td>
                                <td data-label="Početak rezervacije">12:00</td>
                                <td data-label="Kraj rezervacije">14:00</td>
                                <td data-label="Za platiti">2 KM</td>
                                {button1 && <td data-label><button className="delete-button">Odgodi</button></td>}
                            </tr>
                            <tr>
                                <td data-label="Username">Mujke</td>
                                <td data-label="Email">mujo.mujic12@gmail.com</td>
                                <td data-label="Parking">Alta parking</td>
                                <td data-label="Adresa parkinga">Franca Lehara 2</td>
                                <td data-label="Registracijske oznake">A12-A-123</td>
                                <td data-label="Početak rezervacije">12:00</td>
                                <td data-label="Kraj rezervacije">14:00</td>
                                <td data-label="Za platiti">2 KM</td>
                                {button1 && <td data-label><button className="delete-button">Odgodi</button></td>}
                            </tr>
                        </>
                    )}

                    {button2 && (
                        <>
                            <tr>
                                <td data-label="Username">Mujke</td>
                                <td data-label="Email">mujo.mujic12@gmail.com</td>
                                <td data-label="Parking">Alta parking</td>
                                <td data-label="Adresa parkinga">Franca Lehara 2</td>
                                <td data-label="Registracijske oznake">A12-A-123</td>
                                <td data-label="Početak rezervacije">12:00</td>
                                <td data-label="Kraj rezervacije">14:00</td>
                                <td data-label="Za platiti">2 KM</td>
                            </tr>
                            <tr>
                                <td data-label="Username">Mujke</td>
                                <td data-label="Email">mujo.mujic12@gmail.com</td>
                                <td data-label="Parking">Alta parking</td>
                                <td data-label="Adresa parkinga">Franca Lehara 2</td>
                                <td data-label="Registracijske oznake">A12-A-123</td>
                                <td data-label="Početak rezervacije">12:00</td>
                                <td data-label="Kraj rezervacije">14:00</td>
                                <td data-label="Za platiti">2 KM</td>
                            </tr>
                            <tr>
                                <td data-label="Username">Mujke</td>
                                <td data-label="Email">mujo.mujic12@gmail.com</td>
                                <td data-label="Parking">Alta parking</td>
                                <td data-label="Adresa parkinga">Franca Lehara 2</td>
                                <td data-label="Registracijske oznake">A12-A-123</td>
                                <td data-label="Početak rezervacije">12:00</td>
                                <td data-label="Kraj rezervacije">14:00</td>
                                <td data-label="Za platiti">2 KM</td>
                            </tr>
                            <tr>
                                <td data-label="Username">Mujke</td>
                                <td data-label="Email">mujo.mujic12@gmail.com</td>
                                <td data-label="Parking">Alta parking</td>
                                <td data-label="Adresa parkinga">Franca Lehara 2</td>
                                <td data-label="Registracijske oznake">A12-A-123</td>
                                <td data-label="Početak rezervacije">12:00</td>
                                <td data-label="Kraj rezervacije">14:00</td>
                                <td data-label="Za platiti">2 KM</td>
                            </tr>
                        </>
                    )}
                    
                    {button3 && (
                        <>
                            <tr>
                                <td data-label="Username">Mujke</td>
                                <td data-label="Email">mujo.mujic12@gmail.com</td>
                                <td data-label="Parking">Alta parking</td>
                                <td data-label="Adresa parkinga">Franca Lehara 2</td>
                                <td data-label="Registracijske oznake">A12-A-123</td>
                                <td data-label="Početak rezervacije">12:00</td>
                                <td data-label="Kraj rezervacije">14:00</td>
                                <td data-label="Za platiti">2 KM</td>
                            </tr>
                            <tr>
                                <td data-label="Username">Mujke</td>
                                <td data-label="Email">mujo.mujic12@gmail.com</td>
                                <td data-label="Parking">Alta parking</td>
                                <td data-label="Adresa parkinga">Franca Lehara 2</td>
                                <td data-label="Registracijske oznake">A12-A-123</td>
                                <td data-label="Početak rezervacije">12:00</td>
                                <td data-label="Kraj rezervacije">14:00</td>
                                <td data-label="Za platiti">2 KM</td>
                            </tr>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminReservationList;