import React, { useEffect } from "react";
import Navigation from "../navigation/Navigation";
import "./parkingDetails.css";
//sljedeca 4 importa iz foldera images obrisati kad se uspostavi konekcija sa bazom
import alta1 from "../images/alta1.jpg";
import alta2 from "../images/alta2.jpg";
import alta3 from "../images/alta3.png";
import alta4 from "../images/alta4.jpg";

function ParkingDetails() {

    useEffect(() => {
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
    });
    
    return (
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                <div className = "card-parking-details">
                    <div className = "card">
                        <div className = "product-imgs">
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
                        <div className = "product-content">
                            <h2 className = "product-title">Naziv parkinga</h2>
                            <p className = "product-link">Adresa parkinga: Neka adresa</p>
                            
                            <div className = "product-price">
                                <p className = "new-price">Cijena (po satu): <span>1 KM </span></p>
                            </div>

                            <div className = "product-detail">
                                <h2>Kratke informacije vezane za parking: </h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="comment-section-title">Sekcija komentara za ovaj parking prostor!</h1>
                    <div className="comment-box-inner">
                        <h3>Username korisnika</h3>
                        <p>Ovdje se pise nekakav komentar  dhf dhf dhf hdf hdfhdfh hdfjsf hjsdfh sdjsdjfhsdjf</p>
                        <h6 className="comment-date"> April 18, 2013, 12:01 </h6>  
                    </div>

                    <div className="comment-box-inner">
                        <h3>Username korisnika</h3>
                        <p>Ovdje se pise neki drugi komentar  dhf dhf dhf hdf hdfhdfh hdfjsf hjsdfh sdjsdjfhsdjf </p>
                        <h6 className="comment-date"> September 02, 2022, 14:41 </h6>  
                    </div>
                </div>
            </div>
        </>
    );
}

export default ParkingDetails;