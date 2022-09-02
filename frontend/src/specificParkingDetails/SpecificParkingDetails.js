import React from "react";
import "./specificParkingDetails.css";
import Navigation from "../navigation/Navigation";

function SpecificParkingDetails() {
    return (
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                <h1>Ovdje ide pregled slika i osnovnih podataka</h1>
                <p>Ovdje ce se takodjer nalaziti dugme za rezervaciju, te ispod kao fazon linka gdje ce korisnik moci ostaviti svoj komentar i ocjenu, te drugi link koji ce prikazivati
                    komentare i ocjene ostalih korisnika ovog parking prostora!
                </p>
            </div>
        </>
    )
}

export default SpecificParkingDetails;