import React from "react";
import "./login.css";

function Login() {
    return (
        <div className="full-screen bg-home">
            <div className="form-space">
                {/* Namjestiti da obavijesti svaki put kada je neko od polja prazno. Ime i prezime nisu obavezna polja, ostala jesu!*/}
                <div className="form-login">
                    <div className="title">Dobro došli opet!</div>
                    <div className="subtitle">Unesite neophodne podatke za prijavu na sistem!</div>
                    <div className="input-container ic2">
                        <input id="email" className="input" type="text" placeholder=" " />
                        <div className="cut cut-short"></div>
                        <label for="email" className="placeholder">Vaš email</label>
                    </div>
                    <div className="input-container ic2">
                        <input id="password" className="input" type="password" placeholder=" " />
                        <div className="cut cut-short"></div>
                        <label for="password" className="placeholder">Vaša šifra</label>
                    </div>
                
                    <button type="text" className="submit">Sign up</button>
                </div>
            </div>    
        </div>
    );
};

export default Login;