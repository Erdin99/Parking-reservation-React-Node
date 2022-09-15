import React, {useEffect, useState} from "react";
import "./initialPageAdmin.css";
import parking from "../images/parking.jpg"
import Navigation from "../navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function InitialPageAdmin() {
    
    const [myParkingList, setMyParkingList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("user") === null) {
            navigate('/login');
        }
        else {
            getMyParkingList();
        }
    }, [myParkingList]);

    function getMyParkingList() {
        axios({
            method: "get",
            url: `http://localhost:5000/mylist/parking`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setMyParkingList(res.data.myParkings);
        }).catch(err => console.log(err))
    }

    function deleteMyParking(id) {
        axios({
            method: "delete",
            url: `http://localhost:5000/delete/parking/${id}`,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).catch(error => {
            console.log(error)
        })
    }
    
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
                {myParkingList.length === 0 && (
                    <div className="admin-parking-spot-info">
                        <h2>Trenutno nemate niti jedan postavljen parking prostor za iznajmljivanje!</h2>
                    </div>
                    )
                }
                {myParkingList.map((myParking) => {
                    return (
                        <article className="single-parking-space">
                            <img src={require('../parkingImages/' + myParking.parking_image)} />
                            <footer>
                                <div className="parking-info">
                                <h4>{myParking.parking_name}</h4>
                                <h4 className="parking-price">{myParking.price} KM</h4>
                                </div>
                                <p>{myParking.parking_address}</p>
                                <div className="buttons">
                                    <Link to={`/parking/details/:?id=${myParking.id}`} className="info-btn">Vidi objavu</Link>
                                    <Link to={`/edit/post/:?id=${myParking.id}`} className="edit-btn">Uredi objavu</Link>
                                    <button className="delete-btn" onClick={() => deleteMyParking(myParking.id)}>Izbriši objavu</button>
                                </div>
                            </footer>
                        </article>
                    )
                })}
                
            </div>
        </>
    );
};

export default InitialPageAdmin;