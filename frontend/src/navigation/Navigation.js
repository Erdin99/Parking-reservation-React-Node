import React, { useEffect, useState } from "react";
import "./navigation.css";
import "../usage/usage.css";
import parking_logo from '../images/parking_logo.png'
import { Link } from "react-router-dom";

function Navigation() {

    const adminRole = 1;
    const [role, setRole] = useState(2);

    useEffect(() => {
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
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    })
    
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
                    <li><Link to="/my/profile">Moj profil</Link></li>
                    {role === adminRole ?
                        <li><Link to="/parking/space/form">Postavi parking prostor</Link></li> : ""
                    }
                    {role !== adminRole ?
                        <li><Link to="#">Lista mojih rezervacija</Link></li> : ""
                    }
                    <li><Link to="/about/me">O kreatoru sistema</Link></li>
                    <li href="#" id="openWindow">Način korištenja</li>
                    <li><Link to="#">Logout</Link></li>
                </ul>
            </nav>

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h3 className='informations-title'>Način korištenja:</h3>
                    <p className='informations'>
                        Ukoliko korisnik nema korisnički račun, neophodno je to učiniti klikom na dugme sign up, te unijeti neophodne podatke.
                        Ukoliko korisnik ima korisnički račun neophodno je samo da se loguje i ima pristup svim parking mjestima. 
                        Korisnik koji istražuje parking mjesto za rezervaciju ima mogućnost da pretraži odgovarajući parking, 
                        te klikom na karticu ima mogućnost da vidi detalje vezane za taj parking prostor, dok korisnik koji iznajmljuje ima mogućnost 
                        da unese svoj parking prostor za rezervisanje te neki dodatni opis vezan za isti. 
                        Ukoliko parking prostor nema slobodnih mjesta, korisniku će biti prikazana informacija te neće imati mogućnost da rezerviše 
                        parking mjesto. Korisnik ima mogućnost ostaviti ocjenu, te komentar u vidu svog iskustva, tako da može dati potencijalno važnu
                        informaciju za buduće korisnike. Prilikom rezervacije parking prostora, na mail se dobija kod koji se koristi kao verifikacija
                        da je parking mjesto rezervisano. Bez tog koda ulaz na parking nije moguć. Prilikom izlaska sa parking prostora, Vaša rezervacija
                        se poništava, te ukoliko želite ući opet na parking prostor, to neće biti moguće ukoliko opet ne rezervišete parking mjesto i dobijete
                        novi kod na mail.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Navigation;