import React, { useState, state, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import "./parkingSpaceForm.css";
import axios from "axios";
import $ from 'jquery';
import {useNavigate} from "react-router-dom";

function ParkingSpaceForm() {

    const [parkingName, setParkingName] = useState("");
    const [parkingAddress, setParkingAddress] = useState("");
    const [numberOfParkingSpots, setNumberOfParkingSpots] = useState(0);
    const [parkingPrice, setParkingPrice] = useState(0);
    const [basicInformations, setBasicInformations] = useState("");
    const [parkingImages, setParkingImages] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("user") === null) {
            navigate('/login')
        }
    });

    function fileSelectedHandler(e) {
        setParkingImages([...e.target.files]);
    }

    function createParkingSpot(e) {
        e.preventDefault();
        console.log(parkingName);
        console.log(parkingAddress);
        console.log(numberOfParkingSpots);
        console.log(parkingPrice);
        console.log(basicInformations);
        console.log(parkingImages[0].name);

        const data = {
            parking_name: parkingName,
            parking_address: parkingAddress,
            number_of_parking_spots: numberOfParkingSpots,
            basic_informations: basicInformations,
            price: parkingPrice,
            parking_image: parkingImages[0].name
        }

        axios({
            method: "post",
            url: `http://localhost:5000/create/parking`,
            data: data,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            },
            body: JSON.stringify(data),
        }).then(res => {
            navigate(`/parking/space/form`)
            setParkingName("");
            setParkingAddress("");
            setNumberOfParkingSpots(0);
            setParkingPrice(0);
            setBasicInformations("");
            setParkingImages([]);
            $(".create_parking_notification").toggleClass("active");
                    $("#create_parking_notification_type").toggleClass("success_create_parking");
                    setTimeout(function() {
                        $(".create_parking_notification").removeClass("active");
                        $("#create_parking_notification_type").removeClass("success_create_parking");
                }, 3000);
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                <div className="create_parking_notification"><span id="create_parking_notification_type" className=""></span></div>
                <div className="container-post-parking-form">
                    <h1 className="title">Unesite neophodne podatke za Vaš parking prostor!</h1>
                    <form onSubmit={createParkingSpot} enctype="multipart/form-data">
                        <div className="grid">
                            <div className="form-group a">
                                <label htmlFor="name">Naziv parkinga:</label>
                                <input id="name" type="text" value={parkingName} onChange={(e) => setParkingName(e.target.value)} required />
                            </div>
                            <div className="form-group b">
                                <label htmlFor="address">Adresa parking prostora:</label>
                                <input id="address" type="text" value={parkingAddress} onChange={(e) => setParkingAddress(e.target.value)} required />
                            </div>
                            <div className="form-group number-group">
                                <label htmlFor="nubmer">Broj mjesta s kojim parking raspolaže:</label>
                                <input id="number" type="number" value={numberOfParkingSpots} onChange={(e) => setNumberOfParkingSpots(e.target.value)} required />
                            </div>
                            <div className="form-group price-group">
                                <label htmlFor="price">Cijena po satu</label>
                                <input id="price" type="number" value={parkingPrice} onChange={(e) => setParkingPrice(e.target.value)} required />
                            </div>
                            <div className="textarea-group">
                                <label htmlFor="bio">Osnovne informacije:</label>
                                <textarea id="bio" type="text" value={basicInformations} onChange={(e) => setBasicInformations(e.target.value)} required></textarea>
                            </div>
                            
                            <div className="form-group image-group">
                                <label htmlFor="image">Postavite fotografije za Vaš parking prostor:</label>
                                <input type="file" name="file" multiple accept="image/*" onChange={fileSelectedHandler} required/>
                            </div>
                            
                        </div>
                        
                        <div className="button-container">
                            <button type="submit" className="button-post-form">Objavi</button>
                        </div>
                    </form>
                </div>
            </div>    
        </>
    );
}

export default ParkingSpaceForm;