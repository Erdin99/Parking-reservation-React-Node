import React from "react";
import "./signup.css";

function Signup() {
    return (
        <div className="full-screen bg-home">
            <div className="form-space">
                {/* Namjestiti da obavijesti svaki put kada je neko od polja prazno. Ime i prezime nisu obavezna polja, ostala jesu!*/}
                <div className="form">
                    <div className="title">Dobro došli!</div>
                    <div className="subtitle">Kreirajte Vaš korisnički račun!</div>
                    <div className="input-container ic1">
                        <input id="firstname" className="input" type="text" placeholder=" " />
                        <div className="cut"></div>
                        <label for="firstname" className="placeholder">Vaše ime</label>
                    </div>
                    <div className="input-container ic2">
                        <input id="lastname" className="input" type="text" placeholder=" " />
                        <div className="cut"></div>
                        <label for="lastname" className="placeholder">Vaše prezime</label>
                    </div>
                    <div className="input-container ic2">
                        <input id="username" className="input" type="text" placeholder=" " />
                        <div className="cut"></div>
                        <label for="username" className="placeholder">Vaš username</label>
                    </div>
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
                    <div className="input-container ic2">
                        <form>
                            <label className="role-label">Izaberite rolu na sistemu:</label>
                            <select name="roles" className="roles">
                                <option value="volvo">Postavljam parking na rezervaciju</option>
                                <option value="saab">Rezervišem parking prostor</option>
                            </select>
                        </form>
                    </div>
                    <button type="text" className="submit">Sign up</button>
                </div>
            </div>    
        </div>
    );
};

export default Signup;