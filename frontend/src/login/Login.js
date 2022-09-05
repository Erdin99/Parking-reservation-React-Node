import React, { useState } from "react";
import "./login.css";

function Login() {

    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fieldMailLogin, setFieldMailLogin] = useState(false);
    const [fieldPasswordLogin, setFieldPasswordLogin] = useState(false);

    const onHandleLogin = async (e) => {
        e.preventDefault();
        
        console.log('email -> ', email);
        console.log('password -> ', password);

        if(email === "") {
            setFieldMailLogin(true);
        }
        else {
            setFieldMailLogin(false);
        }

        if(password === "") {
            setFieldPasswordLogin(true);
        }
        else {
            setFieldPasswordLogin(false);
        }
    } 

    return (
        <div className="full-screen bg-home">
            <div className="form-space">
                <div className="form-login">
                    <form onSubmit={onHandleLogin}>
                        <div className="title-login">Dobro došli opet!</div>
                        <div className="subtitle">Unesite neophodne podatke za prijavu na sistem!</div>
                        {error && <p className="info">Neispravan unos email-a ili šifre</p>}
                        <div className="input-container ic2">
                            <input id="email" className="input" name="email" value={email} type="text" placeholder=" " onChange={e => setEmail(e.target.value)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="email" className="placeholder">Vaš email</label>
                        </div>
                        {fieldMailLogin && <p className="info">Neophodno je unijeti email prilikom prijave na sistem!</p>}
                        <div className="input-container ic2">
                            <input id="password" className="input" name="password" value={password} type="password" placeholder=" " onChange={e => setPassword(e.target.value)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="password" className="placeholder">Vaša šifra</label>
                        </div>
                        {fieldPasswordLogin && <p className="info">Neophodno je unijeti šifru prilikom prijave na sistem!</p>}
                        <button type="text" className="submit">Login</button>
                    </form>
                </div>
            </div>    
        </div>
    );
};

export default Login;