import React from "react";
import Navigation from "../navigation/Navigation";

function EditPost() {
    return (
        <>
            <div>
                <Navigation />
            </div>

            <div className="content-admin">
                <div className="container-post-parking-form">
                    <h1 className="title">Ovdje možete urediti vašu objavu!</h1>
                    <form>
                        <div className="grid">
                            <div className="form-group a">
                                <label htmlFor="name">Naziv parkinga:</label>
                                <input id="name" type="text" />
                            </div>
                            <div className="form-group b">
                                <label htmlFor="address">Adresa parking prostora:</label>
                                <input id="address" type="text" />
                            </div>
                            <div className="form-group number-group">
                                <label htmlFor="nubmer">Broj mjesta s kojim parking raspolaže:</label>
                                <input id="number" type="number" />
                            </div>
                            <div className="form-group price-group">
                                <label htmlFor="price">Cijena po satu</label>
                                <input id="price" type="number" />
                            </div>
                            <div className="textarea-group">
                                <label htmlFor="bio">Osnovne informacije:</label>
                                <textarea id="bio"></textarea>
                            </div>
                        </div>
                        
                        <div className="button-container">
                            <button className="button-post-form">Uredi</button>
                        </div>
                    </form>
                </div>
            </div>    
        </>
    );
}

export default EditPost;