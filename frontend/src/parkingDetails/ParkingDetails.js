import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import "./parkingDetails.css";
//sljedeca 4 importa iz foldera images obrisati kad se uspostavi konekcija sa bazom
import alta1 from "../images/alta1.jpg";
import alta2 from "../images/alta2.jpg";
import alta3 from "../images/alta3.png";
import alta4 from "../images/alta4.jpg";
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from "moment";

function ParkingDetails() {

    const parkingId = new URLSearchParams(window.location.search).get('id');
    const [myParkingDetails, setMyParkingDetails] = useState([]);
    const [myParkingComments, setMyParkingComments] = useState([]);

    const [counter, setCounter] = useState(5);
    const [removeLink, setRemoveLink] = useState(false); //ovo removeLink je za otvori jos komentara, u slucaju da nema vise komentara za prikaz, uklanja se link

    useEffect(() => {
        getMyParkingDetails();

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

        window.addEventListener('resize', slideImage);

        // u ovom slucaju je 11, taj broj ovisi o tome koliko komentara se nalazi za odredjeni parking prostor, te kad izvucemo sve elemente, duzinu liste koristimo u tom slucaju umjesto
        // broja 11
        if(counter > 11) {
            setRemoveLink(true);
        }
    }, [counter]);

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
                                    <img src = {alta1} alt = "parking image" />
                                    <img src = {alta2} alt = "parking image" />
                                    <img src = {alta3} alt = "parking image" />
                                    <img src = {alta4} alt = "parking image" />
                                </div>
                            </div>
                            <div className = "img-select">
                                <div className = "img-item">
                                    <a href = "#" data-id = "1">
                                         <img src = {alta1} alt = "parking image" />                              
                                    </a>
                                </div>
                                <div className = "img-item">
                                    <a href = "#" data-id = "2">
                                        <img src = {alta2} alt = "parking image" />
                                    </a>
                                </div>
                                <div className = "img-item">
                                    <a href = "#" data-id = "3">
                                        <img src = {alta3} alt = "parking image" />
                                    </a>
                                </div>
                                <div className = "img-item">
                                    <a href = "#" data-id = "4">
                                        <img src = {alta4} alt = "parking image" />
                                    </a>
                                </div>
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
    
                    {removeLink !== true ? <li className="increase-counter" onClick={(e) => increaseCounter()}>Otvori još komentara</li> : ""}
                </div>
            </div>
        </>
    );
}

export default ParkingDetails;