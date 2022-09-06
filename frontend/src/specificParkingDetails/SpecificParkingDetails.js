import React, {useState, useEffect} from "react";
import "./specificParkingDetails.css";
import Navigation from "../navigation/Navigation";
import alta1 from "../images/alta1.jpg";
import alta2 from "../images/alta2.jpg";
import alta3 from "../images/alta3.png";
import alta4 from "../images/alta4.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function SpecificParkingDetails() {

    const parkingId = new URLSearchParams(window.location.search).get('id');
    const [parkingDetails, setParkingDetails] = useState([]);
    const [parkingComments, setParkingComments] = useState([]);

    const [counter, setCounter] = useState(5);
    const [removeLink, setRemoveLink] = useState(false); //ovo removeLink je za otvori jos komentara, u slucaju da nema vise komentara za prikaz, uklanja se link
    const [commentsSection, setCommentsSection] = useState(true);
    const [reviewSection, setReviewSection] = useState(false);

   

    useEffect(() => {
        getParkingDetails();
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
        if(counter > parkingComments.length + 5) {
            setRemoveLink(true);
        }

        //blok koda koji klikom na "Rezervisi parking" otvara prozor sa formom za rezervaciju
        var formModal = document.getElementById("formModal");

        var openFormLink = document.getElementById("openForm");

        var closeSpan = document.getElementsByClassName("closeForm")[0];

        openFormLink.onclick = function() {
            formModal.style.display = "block";
        }

        closeSpan.onclick = function() {
            formModal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === formModal) {
                formModal.style.display = "none";
            }
        }

    }, [counter]);


    function openCommentSection() {
        setCommentsSection(true);
        setReviewSection(false);
    }

    function openReviewSection() {
        setCommentsSection(false);
        setReviewSection(true);
    }

    function increaseCounter() {
        setCounter(counter + 5);
        console.log('counter->', counter);
        console.log('duzina->', parkingComments.length);
    }

    const runCallback = (cb) => {
        return cb();
    }

    async function getParkingDetails() {
        const response = await axios.get(`http://localhost:5000/parking/details/${parkingId}`).then(res => {
            setParkingDetails(res.data.parkingDetail[0]);
            setParkingComments(res.data.parkingComments);
        }).catch(err => console.log(err));

        return response;
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
                            
                            <h2 className = "parking-title">{parkingDetails.parking_name}</h2>
                            <p className = "parking-link">Adresa parkinga: {parkingDetails.parking_address}</p>
                            
                            <div className = "parking-price">
                                <p className = "new-price">Cijena (po satu): <span>{parkingDetails.price} KM</span></p>
                            </div>

                            <div className="number">
                                <p>Broj trenutno slobodnih mjesta je: <span style={{color: "#256eff"}}>{parkingDetails.number_of_parking_spots}</span></p>
                            </div>

                            <div className = "parking-detail">
                                <h2>Kratke informacije vezane za parking: </h2>
                                <p>{parkingDetails.basic_informations}</p>
                            </div>

                            <div className="check-parking-reservation">
                                <li href="#" id="openForm" className="reservation-button">Rezerviši parking</li>
                            </div>
                    
                        </div>
                        <div id="formModal" className="form-modal">                     
                            <div className="container-post-parking-form">
                                <span className="closeForm">&times;</span>
                                <h1 className="title">Unesite neophodne podatke za rezervaciju parking prostora!</h1>
                                <form>
                                    <div className="grid">
                                        <div className="form-group a">
                                            <label htmlFor="name">Broj registracijskih tablica:</label>
                                            <input id="name" type="text" />
                                        </div>
                                        <div className="form-group number-group">
                                            <label htmlFor="nubmer">Izaberite vrijeme za početak rezervacije:</label>
                                            <input id="reservationTimeBegin" type="text"></input>
                                        </div>
                                        <div className="form-group price-group">
                                            <label htmlFor="number">Izaberite vrijeme za kraj rezervacije:</label>
                                            <input id="reservationTimeEnd" type="text"></input>
                                        </div>
                                        
                                    </div>
                                    <div className="button-container">
                                        <button className="button-post-form">Rezerviši</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="parking-info-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" id="comments-tab" data-toggle="tab" href="#comments" role="tab" aria-controls="comments" aria-selected="true" onClick={(e) => openCommentSection()} style={{fontWeight: commentsSection ? "bold": ""}}>Komentari</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false" onClick={(e) => openReviewSection()} style={{fontWeight: reviewSection ? "bold": ""}}>Napiši komentar</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        {commentsSection &&
                            <div className="tab-pane fade show active" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                                <div>
                                    <h1 className="comment-title">Sekcija komentara korisnika parking prostora</h1>
                                    {parkingComments.length === 0 && <h1 className="comment-info">Trenutno nema komentara za ovaj parking prostor</h1>}
                                    {
                                        runCallback(() => {
                                            const comments = [];
                                            var i = 0;
                                            {parkingComments.map((com) => {
                                                if(i < counter) {
                                                    comments.push(
                                                        <div className="comment-box-inner">
                                                            <h3>{com.created_comment_by_username}</h3>
                                                            <p>{com.comment}</p>
                                                            <h6 className="comment-date"> {com.created_at} </h6>  
                                                        </div>
                                                    );
                                                }
                                                i++;
                                            })}
                                            return comments;
                                        })
                                    }
                                </div>

                                {parkingComments.length > 0 && removeLink !== true ? <li className="increase-counter" onClick={(e) => increaseCounter()}>Otvori još komentara</li> : ""}
                            </div>
                        }
                        { reviewSection &&
                            <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                <div className="review-heading">Upišite komentar</div>
                                <p className="mb-20">Neophodno je ispuniti svako naznačeno polje. Naznačeno polje je sa oznakom <span className="star">*</span>.</p>
                                <form className="review-form">
                                    
                                    <div className="form-group">
                                        <label>Vaš komentar <span className="star">*</span></label>
                                        <textarea className="form-control" rows="10" required></textarea>
                                    </div>
                                    <div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Username <span className="star">*</span></label>
                                                <input type="text" name="" className="form-control" placeholder="Username" required/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Email <span className="star">*</span></label>
                                                <input type="text" name="" className="form-control" placeholder="Email" required/>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="round-black-btn">Pošalji</button>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpecificParkingDetails;