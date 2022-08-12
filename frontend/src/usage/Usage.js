import React from "react";
import "./usage.css";

function Usage() {
    return (
        <div className="full-screen bg-home">
            <article className='card'>
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
            </article>
        </div>
    );
}

export default Usage;