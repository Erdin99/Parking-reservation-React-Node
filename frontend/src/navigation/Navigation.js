import React, { useEffect, useState } from "react";
import "./navigation.css";
import "../usage/usage.css";
import parking_logo from '../images/parking_logo.png'
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Navigation() {
    const adminRole = 1;
    const [role, setRole] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        //blok koda koji klikom na "Način korištenja" otvara prozor sa tekstom
        var modal = document.getElementById("myModal");

        var link = document.getElementById("openWindow");

        var span = document.getElementsByClassName("close")[0];

        link.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    })

    function handleLogout() {
        localStorage.removeItem('user');
    }


    return( 
        <>
            <nav role="navigation" className="primary-navigation">
                <div className="logo-space">
                    <img src={parking_logo} width="400" height="70" alt="parking logo" className="parking_logo"></img>
                </div>
                <ul>
                    {role === adminRole ? 
                        <li><Link to="/users/admin">Početna</Link></li> : <li><Link to="/users/user">Početna</Link></li>
                    }
                    <li><Link to="/common/wall">Zajednički zid</Link></li>
                    {role === adminRole ?
                        <li><Link to="/parking/space/form">Postavi parking prostor</Link></li> : ""
                    }
                    {role !== adminRole ?
                        <li><Link to="/reservation/list">Lista mojih rezervacija</Link></li> : ""
                    }
                    <li><Link to="/about/me">O kreatoru sistema</Link></li>
                    <li href="#" id="openWindow">Način korištenja</li>
                    <form className="logout-button-position" method="post" action="http://localhost:5000/logout"><button className="logout-button" type="submit" onClick={handleLogout}>Logout</button></form>
                </ul>
            </nav>
            
            <div className="navigation-fixed-placeholder"></div>


            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h3 className='informations-title'>Način korištenja:</h3>
                    <p className='informations'>
                        Korisnik koji istražuje parking mjesto za rezervaciju ima listu parking prostora, gdje ima mogućnost pretraživanja i odabira po svojoj želji.
                        U samom vrhu na početnoj strani nalazi se filter, po kojem se može filtrirati lista parking prostora. Klikom na karticu nalaze se detalji vezan 
                        za taj parking prostor, te mogućnost pregleda i pisanja komentara kao i rezervisanja. 
                        Na zajedničkom zidu se iznose mišljenja korisnika za određeni prostor, kao i eventualno obavještenje od strane vlasnika parkinga.
                        Korisnik ima mogućnost i pregleda svojih rezervacija za taj dan, prethodne rezervacije i odgođene rezervacije, što od svojih odgađanja tako i od
                        vlasnika parking prostora.
                        <br />
                        Što se tiče korisnika koji postavljaju parking na iznajmljivanje, pa početnoj se nalazi lista postavljenih parking prostora, gdje imate mogućnost pregledati
                        objavu, urediti je ili obrisati. Na postavi parking prostor, unosite podatke koje želite da budu prikazani drugim korisnicima.
                        Na samom kraju, o kreatoru sistema, imate osnovne informacije o meni, te linkove na kojima me možete kontaktirati.
                        <br />
                        Prilikom rezervacije parking prostora, na mail se dobija kod koji se koristi kao verifikacija
                        da je parking mjesto rezervisano. Bez tog koda ulaz na parking nije moguć. Prilikom izlaska sa parking prostora, vaša rezervacija
                        se poništava, te ukoliko želite ući opet na parking prostor, to neće biti moguće ukoliko opet ne rezervišete parking mjesto i dobijete
                        novi kod na mail.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Navigation;