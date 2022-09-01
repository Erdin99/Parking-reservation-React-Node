import React from "react";
import Navigation from "../navigation/Navigation";
import "./parkingSpaceForm.css";

function ParkingSpaceForm() {
    return (
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                <div className="container-post-parking-form">
                    <h1 className="title">Unesite neophodne podatke za Vaš parking prostor!</h1>
                    <form>
                        <div className="grid">
                            <div className="form-group a">
                                <label for="name">Naziv parkinga:</label>
                                <input id="name" type="text" />
                            </div>
                            <div className="form-group b">
                                <label for="address">Adresa parking prostora:</label>
                                <input id="address" type="text" />
                            </div>
                            <div className="form-group number-group">
                                <label for="nubmer">Broj mjesta s kojim parking raspolaže:</label>
                                <input id="number" type="number" />
                            </div>
                            <div className="form-group price-group">
                                <label for="price">Cijena po satu</label>
                                <input id="price" type="number" />
                            </div>
                            <div className="textarea-group">
                                <label for="bio">Osnovne informacije:</label>
                                <textarea id="bio"></textarea>
                            </div>
                            
                            <div className="form-group image-group">
                                <label for="image">Postavite fotografije za Vaš parking prostor:</label>
                                <input type="file"  name="file" multiple accept="image/*"/>
                            </div>
                            
                        </div>
                        
                        <div className="button-container">
                            <button className="button">Objavi</button>
                        </div>
                    </form>
                </div>
            </div>    
        </>
    );
}

export default ParkingSpaceForm;