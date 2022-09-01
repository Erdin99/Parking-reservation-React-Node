import React from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer"
import myProfileImage from "../images/my-profile-image.jpg";
import "./aboutMe.css";

function AboutMe() {
    return(
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                <div className="section-contact">
                    <div className="contact-card">
                        <div className="card-image">
                            <img src={myProfileImage} alt="Put image here" />
                            <h2>Erdin Idrizović</h2>
                            <h5>Student na Prirodno-matematičkom fakultetu</h5>
                            <h5>Smjer: Informacione tehnologije</h5>
                        </div>
                        <div className="card-text">
                            <p>Moje ime je Erdin Idrizović. Student sam završne godine na Prirodno-matematičkom fakultetu, smjer "Informacione tehnologije". 
                                Kao temu projekta izabrao sam rezervaciju slobodnih parking prostora, s ciljem da u periodu velikih gužvi i potražnji istih, možete od kuće rezervisati 
                                prostor po Vašoj preferenciji, te se uputiti ka istom u periodu odabranog termina. Za bilo kakve informacije možete me kontaktirati na nekim od društvenih 
                                mreža postavljenih u nastavku.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>    
        </>
        
    );
}

export default AboutMe;