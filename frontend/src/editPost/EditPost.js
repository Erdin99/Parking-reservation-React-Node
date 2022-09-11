import React, { useEffect, useState } from "react";
import "./editPost.css";
import Navigation from "../navigation/Navigation";
import axios from "axios";
import $ from 'jquery';
import {useNavigate} from "react-router-dom";

function EditPost() {

    const parkingId = new URLSearchParams(window.location.search).get('id');

    const [showAlert, steShowAlert] = useState(false);
 
    const [parkingName, setParkingName] = useState('');
    const [parkingAddress, setParkingAddress] = useState('');
    const [parkingInfo, setParkingInfo] = useState('');
    const [parkingNumber, setParkingNumber] = useState(0);
    const [parkingPrice, setParkingPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        getMyParkingDetails();
    }, [showAlert])

    function getMyParkingDetails() {
        axios({
            method: "get",
            url: `http://localhost:5000/parking/details/${parkingId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setParkingName(res.data.parkingDetail[0].parking_name);
            setParkingAddress(res.data.parkingDetail[0].parking_address);
            setParkingInfo(res.data.parkingDetail[0].basic_informations);
            setParkingNumber(res.data.parkingDetail[0].number_of_parking_spots);
            setParkingPrice(res.data.parkingDetail[0].price);
        }).catch(err => console.log(err))
    }

    function updateParkingPost(e) {
        e.preventDefault();

        if(parkingName === '' || parkingAddress === '' || parkingNumber === '' || parkingInfo === '' || parkingPrice === '') {
            steShowAlert(true);
            $(".info_notification").toggleClass("active");
            $("#info_notification_type").toggleClass("success_info");
            setTimeout(function() {
                $(".info_notification").removeClass("active");
                $("#info_notification_type").removeClass("success_info");
            }, 3000);
        }
        else {

            const data = {
                parking_name: parkingName,
                parking_address: parkingAddress,
                number_of_parking_spots: parkingNumber,
                basic_informations: parkingInfo,
                price: parkingPrice
            }

            axios({
                method: "patch",
                url: `http://localhost:5000/update/parking/${parkingId}`,
                data: data,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: JSON.parse(localStorage.getItem("user"))
                },
                body: JSON.stringify(data),
            }).then(res => {
                navigate(`/edit/post/:?id=${parkingId}`);
                steShowAlert(true);
                $(".update_notification").toggleClass("active");
                    $("#update_notification_type").toggleClass("success_update");
                    setTimeout(function() {
                        $(".update_notification").removeClass("active");
                        $("#update_notification_type").removeClass("success_update");
                }, 3000);
            }).catch(error => {
                console.log(error)
            });
        }
    }

    return (
        <>
            <div>
                <Navigation />
            </div>

            <div className="content-admin">
                <div className="update_notification"><span id="update_notification_type" className=""></span></div>
                <div className="info_notification"><span id="info_notification_type" className=""></span></div>
                <div className="container-post-parking-form">
                    <h1 className="title">Ovdje možete urediti vašu objavu!</h1>
                    <form onSubmit={updateParkingPost}>
                        <div className="grid">
                            <div className="form-group a">
                                <label htmlFor="name">Naziv parkinga:</label>
                                <input id="name" type="text" value={parkingName} onChange={e => setParkingName(e.target.value)}/>
                            </div>
                            <div className="form-group b">
                                <label htmlFor="address">Adresa parking prostora:</label>
                                <input id="address" type="text" value={parkingAddress} onChange={e => setParkingAddress(e.target.value)} />
                            </div>
                            <div className="form-group number-group">
                                <label htmlFor="nubmer">Broj mjesta s kojim parking raspolaže:</label>
                                <input id="number" type="number" value={parkingNumber} onChange={e => setParkingNumber(e.target.value)}/>
                            </div>
                            <div className="form-group price-group">
                                <label htmlFor="price">Cijena po satu</label>
                                <input id="price" type="number" value={parkingPrice} onChange={e => setParkingPrice(e.target.value)}/>
                            </div>
                            <div className="textarea-group">
                                <label htmlFor="bio">Osnovne informacije:</label>
                                <textarea id="bio" value={parkingInfo} onChange={e => setParkingInfo(e.target.value)}></textarea>
                            </div>
                        </div>
                        
                        <div className="button-container">
                            <button type="submit" className="button-post-form">Uredi</button>
                        </div>
                    </form>
                </div>
            </div>    
        </>
    );
}

export default EditPost;