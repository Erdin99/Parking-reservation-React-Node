import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import "./parkingDetails.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from "moment";

function ParkingDetails() {

    const parkingId = new URLSearchParams(window.location.search).get('id');
    const [myParkingDetails, setMyParkingDetails] = useState([]);
    const [myParkingComments, setMyParkingComments] = useState([]);
    const [parkingImages, setParkingImages] = useState([]);

    const [counter, setCounter] = useState(5);
    const [removeLink, setRemoveLink] = useState(false); //ovo removeLink je za otvori jos komentara, u slucaju da nema vise komentara za prikaz, uklanja se link

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("user") === null) {
            navigate('/login');
        }
        else {
            getMyParkingDetails();
            getImages();
            
            //blok koda koji omogucava prelaz sa slike na sliku
            const imgs = document.querySelectorAll('.img-select a');
            const imgBtns = [...imgs];
            let imgId = 1;

            imgBtns.forEach((imgItem) => {
                imgItem.addEventListener('click', (event) => {
                    event.preventDefault();
                    imgId = imgItem.dataset.id;
                    slideImage();
                });
            });

            function slideImage(){
                const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

                document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
            }

            //window.addEventListener('resize', slideImage);

            if(counter > myParkingComments.length + 5) {
                setRemoveLink(true);
            }
        }
    }, [counter, parkingImages]);

    function getMyParkingDetails() {
        axios({
            method: "get",
            url: `http://localhost:5000/parking/details/${parkingId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setMyParkingDetails(res.data.parkingDetail[0])
            setMyParkingComments(res.data.parkingComments);
        }).catch(err => console.log(err))
    }

    function increaseCounter() {
        setCounter(counter + 5);
    }

    const runCallback = (cb) => {
        return cb();
    }

    function getImages() {
        axios({
            method: "get",
            url: `http://localhost:5000/parking/images/${parkingId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setParkingImages(res.data.parkingImages)
        }).catch(err => console.log(err))
    }
    
    return (
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                <div className = "card-parking-details">
                    <div className = "card">
                        <div className = "parking-imgs">
                            <div className = "img-display">
                                <div className = "img-showcase">
                                    {parkingImages.map((parkingImg) => {
                                        return (
                                            <img src = {require('../parkingImages/' + parkingImg.image)} alt = "parking image" />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className = "img-select">
                                {parkingImages.map((parkingImg, i = 1) => {
                                    return (
                                        <div className = "img-item">
                                            <a href = "#" data-id = {i+1}>
                                                <img src = {require('../parkingImages/' + parkingImg.image)} alt = "parking image" />                              
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className = "parking-content">
                            <h2 className = "parking-title">{myParkingDetails.parking_name}</h2>
                            <p className = "parking-link">Adresa parkinga: {myParkingDetails.parking_address}</p>
                            
                            <div className = "parking-price">
                                <p className = "new-price">Cijena (po satu): <span>{myParkingDetails.price} KM </span></p>
                            </div>

                            <div className="number">
                                <p>Broj trenutno slobodnih mjesta je: <span style={{color: "#256eff"}}>{myParkingDetails.number_of_parking_spots}</span></p>
                            </div>

                            <div className = "parking-detail">
                                <h2>Kratke informacije vezane za parking: </h2>
                                <p>{myParkingDetails.basic_informations}</p>
                            </div>

                            <div className="check-parking-reservation">
                                <Link to={`/reservations/:?id=${parkingId}`} className="check-reservation-button">Pogledaj rezervacije</Link>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="comment-section-title">Sekcija komentara za ovaj parking prostor!</h1>
                    {myParkingComments.length === 0 && <h1 className="comment-info">Trenutno nema komentara za ovaj parking prostor</h1>}
                    <div>
                        {
                            runCallback(() => {
                                const comments = [];
                                var i = 0;
                                {myParkingComments.map((myCom) => {
                                    if(i < counter) {
                                        comments.push(
                                            <div className="comment-box-inner">
                                                <h3>{myCom.created_comment_by_username}</h3>
                                                <p>{myCom.comment} <br/> <br/> Ocjena: {myCom.grade}</p>
                                                <h6 className="comment-date"> {moment(myCom.created_at).add(2, 'hours').utc().format('YYYY-MM-DD, h:mm:ss a')} </h6>  
                                            </div>
                                        );
                                    }
                                    i++;
                                })}
                                return comments;
                            })
                        }
                    </div>
    
                    {removeLink !== true ? <li className="increase-counter" onClick={(e) => increaseCounter()}>Otvori jo?? komentara</li> : ""}
                </div>
            </div>
        </>
    );
}

export default ParkingDetails;